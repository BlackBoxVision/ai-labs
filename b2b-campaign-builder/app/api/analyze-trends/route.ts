import { NextResponse } from "next/server";
import googleTrends from "google-trends-api";

// Create interfaces for better type safety
interface TrendResult {
  keyword: string;
  volume: number;
  trend: string;
  score: number;
  cluster: string; // Represents the keyword group
  chartData: { date: string; value: number }[];
}

// Helper function to chunk array into specified size
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Helper function to implement retries with exponential backoff
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      console.log(
        `Retry attempt ${attempt + 1}/${maxRetries} after ${Math.round(
          delay
        )}ms`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Helper function to process a single keyword
async function processKeyword(keyword: string): Promise<{
  trendResult: TrendResult;
  trendData: number[] | null;
}> {
  try {
    // Configure request options with browser-like headers
    const options = {
      keyword,
      geo: "US",
      startTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
      hl: "en-US", // Language set to English
      category: 0, // All categories
    };

    // Use retry mechanism
    const interestOverTimeData = await retryOperation(
      () => googleTrends.interestOverTime(options),
      3 // 3 retries
    );

    // Verify we got JSON, not HTML
    if (
      interestOverTimeData.includes("<html") ||
      interestOverTimeData.includes("<!DOCTYPE")
    ) {
      console.error("Received HTML instead of JSON data");
      throw new Error(
        "Google Trends returned HTML instead of data - possible rate limiting"
      );
    }

    // Parse the response
    const parsedData = JSON.parse(interestOverTimeData);

    if (
      !parsedData?.default?.timelineData ||
      parsedData.default.timelineData.length === 0
    ) {
      console.warn(`No timeline data for keyword "${keyword}"`);
      throw new Error("No timeline data available");
    }

    const timelineData = parsedData.default.timelineData;

    // Extract trend data for clustering
    const trendData = timelineData.map((point: any) => point.value[0]);

    // Calculate average interest
    const totalInterest = trendData.reduce(
      (sum: number, value: number) => sum + value,
      0
    );
    const avgInterest =
      trendData.length > 0 ? Math.round(totalInterest / trendData.length) : 0;

    // Get current trend direction (using last 3 data points)
    let trend = "stable";
    if (timelineData.length >= 3) {
      const lastPoints = timelineData.slice(-3);
      if (lastPoints[2].value[0] > lastPoints[0].value[0]) {
        trend = "up";
      } else if (lastPoints[2].value[0] < lastPoints[0].value[0]) {
        trend = "down";
      }
    }

    // Calculate a score (weighted mix of average interest and trend)
    let score = avgInterest;
    if (trend === "up") score += 10;
    if (trend === "down") score -= 5;

    // Ensure score is between 1-100
    score = Math.max(1, Math.min(100, score));

    return {
      trendResult: {
        keyword,
        volume: avgInterest,
        trend,
        score,
        cluster: "", // Placeholder, will be filled later
        chartData: timelineData.slice(-12).map((point: any) => ({
          date: point.formattedTime,
          value: point.value[0],
        })),
      },
      trendData,
    };
  } catch (err) {
    console.error(`Error analyzing trends for keyword "${keyword}":`, err);
    return {
      trendResult: {
        keyword,
        volume: 0,
        trend: "unknown",
        score: 0,
        cluster: "unclustered", // Mark failed keywords
        chartData: [],
      },
      trendData: null,
    };
  }
}

export async function POST(request: Request) {
  try {
    const { keywords } = await request.json();

    if (!keywords || !Array.isArray(keywords)) {
      return NextResponse.json(
        { error: "Keywords array is required" },
        { status: 400 }
      );
    }

    // Process all keywords in chunks of 5
    const keywordChunks = chunkArray(keywords, 5);
    const trendResults: TrendResult[] = [];
    const keywordTrendData: Record<string, number[]> = {};

    // Process each chunk
    for (const chunk of keywordChunks) {
      // Process each keyword in the chunk in parallel
      const chunkResults = await Promise.all(
        chunk.map((keyword) => processKeyword(keyword))
      );

      // Extract results
      chunkResults.forEach((result) => {
        trendResults.push(result.trendResult);
        if (result.trendData) {
          keywordTrendData[result.trendResult.keyword] = result.trendData;
        }
      });

      // Add a delay between chunks to avoid rate limiting
      if (keywordChunks.indexOf(chunk) < keywordChunks.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    // Perform clustering based on trend patterns
    const clusters = performClustering(keywordTrendData);

    // Assign clusters to trend results
    trendResults.forEach((trendResult) => {
      if (trendResult.cluster !== "unclustered") {
        trendResult.cluster = clusters[trendResult.keyword] || "unclustered";
      }
    });

    // Sort by score (highest first)
    trendResults.sort((a, b) => b.score - a.score);

    return NextResponse.json({ trends: trendResults });
  } catch (error) {
    console.error("Error analyzing trends:", error);
    return NextResponse.json(
      { error: "Failed to analyze keyword trends" },
      { status: 500 }
    );
  }
}

// Function to cluster keywords based on trend pattern similarity
function performClustering(
  keywordTrendData: Record<string, number[]>
): Record<string, string> {
  const clusterAssignments: Record<string, string> = {};
  const keywords = Object.keys(keywordTrendData);

  // If no valid trend data, return empty clusters
  if (keywords.length === 0) {
    return clusterAssignments;
  }

  // Calculate similarity matrix
  const similarities: Record<string, Record<string, number>> = {};

  for (let i = 0; i < keywords.length; i++) {
    const keyword1 = keywords[i];
    similarities[keyword1] = {};

    for (let j = 0; j < keywords.length; j++) {
      const keyword2 = keywords[j];
      const trend1 = keywordTrendData[keyword1] || [];
      const trend2 = keywordTrendData[keyword2] || [];

      // Skip if either keyword has no trend data
      if (!trend1.length || !trend2.length) {
        similarities[keyword1][keyword2] = 0;
        continue;
      }

      // Calculate cosine similarity
      const similarity = calculateCosineSimilarity(trend1, trend2);
      similarities[keyword1][keyword2] = similarity;
    }
  }

  // Simple clustering: group keywords with similarity above threshold
  const similarityThreshold = 0.7;
  const clustered = new Set<string>();
  let clusterIndex = 1;

  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];

    // Skip already clustered keywords
    if (clustered.has(keyword)) continue;

    // Start a new cluster
    const clusterName = `cluster-${clusterIndex}`;
    clusterAssignments[keyword] = clusterName;
    clustered.add(keyword);

    // Find similar keywords for this cluster
    for (let j = 0; j < keywords.length; j++) {
      const otherKeyword = keywords[j];
      if (otherKeyword === keyword || clustered.has(otherKeyword)) continue;

      if (similarities[keyword][otherKeyword] >= similarityThreshold) {
        clusterAssignments[otherKeyword] = clusterName;
        clustered.add(otherKeyword);
      }
    }

    clusterIndex++;
  }

  // Assign unclustered keywords
  for (const keyword of keywords) {
    if (!clusterAssignments[keyword]) {
      clusterAssignments[keyword] = "unclustered";
    }
  }

  return clusterAssignments;
}

// Calculate cosine similarity between two vectors
function calculateCosineSimilarity(v1: number[], v2: number[]): number {
  // Make vectors the same length
  const length = Math.min(v1.length, v2.length);
  const a = v1.slice(0, length);
  const b = v2.slice(0, length);

  // Calculate dot product
  let dotProduct = 0;
  let aMagnitude = 0;
  let bMagnitude = 0;

  for (let i = 0; i < length; i++) {
    dotProduct += a[i] * b[i];
    aMagnitude += a[i] * a[i];
    bMagnitude += b[i] * b[i];
  }

  aMagnitude = Math.sqrt(aMagnitude);
  bMagnitude = Math.sqrt(bMagnitude);

  // Handle division by zero
  if (aMagnitude === 0 || bMagnitude === 0) {
    return 0;
  }

  // Calculate cosine similarity
  return dotProduct / (aMagnitude * bMagnitude);
}
