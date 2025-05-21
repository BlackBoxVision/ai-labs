import { AnalysisData, Trend } from "./openrouter-service";

// API endpoints for campaign generation process
const API_ENDPOINTS = {
  ANALYZE_URL: "/api/analyze-url",
  GENERATE_KEYWORDS: "/api/generate-keywords",
  ANALYZE_TRENDS: "/api/analyze-trends",
  GENERATE_CAMPAIGN: "/api/generate-campaign",
};

// Interfaces for API responses
export interface KeywordCluster {
  name: string;
  keywords: string[];
}

export interface KeywordsResponse {
  clusters: KeywordCluster[];
}

export interface TrendsResponse {
  trends: Trend[];
}

export interface AdGroup {
  name: string;
  keywords: string[];
  headlines: string[];
  descriptions: string[];
}

export interface CampaignResponse {
  name: string;
  adGroups: AdGroup[];
  recommendedBidStrategy: string;
  recommendedLocations: string[];
  deviceTargeting: string;
  estimatedPerformance: string;
}

// API client methods
export async function analyzeUrl(url: string): Promise<AnalysisData> {
  const response = await fetch(API_ENDPOINTS.ANALYZE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to analyze URL");
  }

  return response.json();
}

export async function generateKeywords(
  analysis: AnalysisData
): Promise<KeywordsResponse> {
  const response = await fetch(API_ENDPOINTS.GENERATE_KEYWORDS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ analysis }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate keywords");
  }

  return response.json();
}

export async function analyzeTrends(
  keywords: string[]
): Promise<TrendsResponse> {
  const response = await fetch(API_ENDPOINTS.ANALYZE_TRENDS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keywords }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to analyze trends");
  }

  return response.json();
}

export async function generateCampaign(
  analysis: AnalysisData,
  keywords: KeywordsResponse,
  trends: TrendsResponse
): Promise<CampaignResponse> {
  const response = await fetch(API_ENDPOINTS.GENERATE_CAMPAIGN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ analysis, keywords, trends }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate campaign");
  }

  return response.json();
}

// Complete campaign generation flow
export async function generateCompleteCampaign(url: string): Promise<{
  analysis: AnalysisData;
  keywords: KeywordsResponse;
  trends: TrendsResponse;
  campaign: CampaignResponse;
}> {
  // Step 1: Analyze URL
  const analysis = await analyzeUrl(url);

  // Step 2: Generate keywords based on analysis
  const keywords = await generateKeywords(analysis);

  // Step 3: Get all keywords from clusters as flat array
  const keywordsList = keywords.clusters.flatMap((cluster) => cluster.keywords);

  // Step 4: Analyze trends for keywords
  const trends = await analyzeTrends(keywordsList);

  // Step 5: Generate campaign
  const campaign = await generateCampaign(analysis, keywords, trends);

  return {
    analysis,
    keywords,
    trends,
    campaign,
  };
}
