// OpenRouter role type
export type OpenRouterRole = "system" | "user" | "assistant";

// Available models
export enum OpenRouterModel {
  DEEPSEEK_V3 = "deepseek/deepseek-chat-v3-0324:free",
  LLAMA3_8B = "meta-llama/llama-3-8b-instruct:free",
  MISTRAL_7B = "mistralai/mistral-7b-instruct-v0.2:free",
}

// OpenRouter request options type
export interface OpenRouterRequestOptions {
  model: OpenRouterModel;
  messages: {
    role: OpenRouterRole;
    content: string;
  }[];
  temperature?: number;
  max_tokens?: number;
}

// Interface for trend data
export interface Trend {
  keyword: string;
  score: number;
  volume: number;
  trend: string;
}

// Interface for analysis data
export interface AnalysisData {
  topics: string[];
  sellingPoints: string[];
  audience: string[];
  intent: string;
  summary: string;
}

/**
 * Extracts and parses JSON from a model response
 * Handles both raw JSON and JSON in markdown code blocks
 */
export function extractJson(text: string): any {
  try {
    // First, try to parse the entire text as JSON
    return JSON.parse(text);
  } catch (e) {
    // If that fails, try to extract JSON from markdown code blocks
    const jsonRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
    const match = text.match(jsonRegex);

    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (e) {
        console.error("Error parsing JSON from code block:", e);
      }
    }

    // If no code block, try to find any JSON-like structure in the text
    // This regex looks for patterns like { ... } in the text
    const fallbackRegex = /{[\s\S]*}/;
    const fallbackMatch = text.match(fallbackRegex);

    if (fallbackMatch) {
      try {
        return JSON.parse(fallbackMatch[0]);
      } catch (e) {
        console.error("Error parsing JSON from text:", e);
      }
    }

    throw new Error("Failed to extract valid JSON from the response");
  }
}

export async function callOpenRouter(
  options: OpenRouterRequestOptions
): Promise<any> {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not defined");
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
          "X-Title": "B2B Campaign Builder",
        },
        body: JSON.stringify({
          model: options.model,
          messages: options.messages,
          temperature: options.temperature ?? 0.1,
          max_tokens: options.max_tokens ?? 2000,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();

    // Extract the content from the model's response
    if (result.choices && result.choices[0]?.message?.content) {
      const content = result.choices[0].message.content;

      // Parse the content properly, handling both JSON and markdown
      try {
        const parsedJson = extractJson(content);
        result.parsedJson = parsedJson;
      } catch (error) {
        console.error("Failed to parse JSON from model response:", error);
      }
    }

    return result;
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    throw error;
  }
}

// Prompts for each endpoint
export const prompts = {
  analyzeUrl: (pageContent: string): OpenRouterRequestOptions => ({
    model: OpenRouterModel.DEEPSEEK_V3,
    messages: [
      {
        role: "system" as OpenRouterRole,
        content:
          "You are a professional B2B marketing analyst specializing in identifying key elements of B2B service websites.",
      },
      {
        role: "user" as OpenRouterRole,
        content: `Analyze this B2B service landing page content:

${pageContent}

Extract the following information:
1. Key topics (list of 4-6 topics)
2. Key selling points (list of 4-6 points)
3. Target audience (list of 4-6 roles or industries)
4. User intent
5. Brief summary of the page (1-2 sentences)
        
IMPORTANT:
- Your response MUST be a valid JSON object matching the exact structure and property names below.
- Do NOT change, omit, or invent any property names or structure.
- Use these property names exactly:
  - "topics"
  - "sellingPoints"
  - "audience"
  - "intent"
  - "summary"
- Do NOT include any extra fields or text outside the JSON object.
- The JSON must be parseable with no trailing commas or syntax errors.

Format your response as JSON with the following structure:
{
  "topics": ["topic1", "topic2", ...],
  "sellingPoints": ["point1", "point2", ...],
  "audience": ["audience1", "audience2", ...],
  "intent": "description of user intent",
  "summary": "brief summary"
}`,
      },
    ],
    temperature: 0.1,
    max_tokens: 1500,
  }),

  generateKeywords: (analysis: AnalysisData): OpenRouterRequestOptions => ({
    model: OpenRouterModel.DEEPSEEK_V3,
    messages: [
      {
        role: "system" as OpenRouterRole,
        content: `You are a professional B2B marketing expert specializing in Google Ads keyword research. 
        Your task is to generate highly targeted, conversion-focused keywords for B2B services.`,
      },
      {
        role: "user" as OpenRouterRole,
        content: `Generate B2B-focused keywords for a Google Ads campaign based on this content analysis:
        
        Topics: ${analysis.topics.join(", ")}
        Selling Points: ${analysis.sellingPoints.join(", ")}
        Target Audience: ${analysis.audience.join(", ")}
        User Intent: ${analysis.intent}
        
        Create 4 keyword clusters with 10 keywords each. The clusters should be:
        1. Commercial Intent (keywords showing buying intent)
        2. Topic-based (based on the main topic)
        3. Feature/Benefit-based (based on selling points)
        4. Audience-based (based on target audience)
        
        Ensure all keywords are B2B-focused and exclude any B2C or low-conversion keywords.
        
IMPORTANT:
- Your response MUST be a valid JSON object matching the exact structure and property names below.
- Do NOT change, omit, or invent any property names or structure.
- Use these property names exactly:
  - "clusters"
  - Each cluster must have "name" and "keywords"
- Do NOT include any extra fields or text outside the JSON object.
- The JSON must be parseable with no trailing commas or syntax errors.

Format your response as a valid JSON object with the following structure:
{
  "clusters": [
    {
      "name": "cluster name",
      "keywords": ["keyword1", "keyword2", ...]
    }
  ]
}`,
      },
    ],
    temperature: 0.1,
    max_tokens: 2000,
  }),

  generateCampaign: (
    analysis: AnalysisData,
    trends: Trend[]
  ): OpenRouterRequestOptions => ({
    model: OpenRouterModel.DEEPSEEK_V3,
    messages: [
      {
        role: "system" as OpenRouterRole,
        content:
          "You are an expert B2B Google Ads consultant with 15+ years of experience helping B2B services companies achieve higher conversion rates and lower customer acquisition costs.",
      },
      {
        role: "user" as OpenRouterRole,
        content: `Create a high-ROI, conversion-focused Google Ads campaign structure based on the following detailed analysis:

WEBSITE CONTENT ANALYSIS:
- Topics: ${analysis.topics.join(", ")}
- Selling Points: ${analysis.sellingPoints.join(", ")}
- Target Audience: ${analysis.audience.join(", ")}
- User Intent: ${analysis.intent}
- Summary: ${analysis.summary}

KEYWORDS PERFORMANCE DATA:
${trends
  .slice(0, 15)
  .map(
    (t) =>
      `- ${t.keyword} (score: ${t.score}, volume: ${t.volume}, trend: ${t.trend})`
  )
  .join("\n")}

Based on this data, design a high-performance Google Ads campaign that maximizes conversion potential for this B2B service. Follow these best practices:

1. Create 3 meticulously targeted ad groups with clear themes
2. For each ad group:
   - Select exactly 5 high-potential keywords from the analysis
   - Create 3 compelling headlines following these requirements:
     * Each headline MUST be between 15-30 characters
     * Include at least one headline with a number or special character
     * Include at least one headline with a call-to-action
     * Ensure headlines are unique and don't repeat
   - Create 2 persuasive descriptions following these requirements:
     * Each description MUST be between 60-90 characters
     * Include a clear value proposition
     * Include a strong call-to-action
     * Ensure descriptions are unique and don't repeat
   - All copy must focus on benefits, authority, and calls-to-action
3. Include recommendations for:
   - Bidding strategy optimized for B2B lead generation
   - Specific geographic targeting for maximum ROI (5 regions max)
   - Device targeting strategy

IMPORTANT:
- Your response MUST be a valid JSON object matching the exact structure and property names below.
- Do NOT change, omit, or invent any property names or structure.
- Use these property names exactly:
  - "adGroups" (not "adGroup")
  - "keywords" (not "keyword")
  - "headlines" (not "headline")
  - "descriptions" (not "description")
  - "recommendedLocations" (not "recommendedLocation")
- Do NOT include any extra fields or text outside the JSON object.
- The JSON must be parseable with no trailing commas or syntax errors.

Format your response as JSON with the following structure:
{
  "name": "campaign name",
  "adGroups": [
    {
      "name": "ad group name",
      "keywords": ["keyword1", "keyword2", ...],
      "headlines": ["headline1", "headline2", "headline3"],
      "descriptions": ["description1", "description2"]
    }
  ],
  "recommendedBidStrategy": "strategy name",
  "recommendedLocations": ["location1", "location2", ...],
  "deviceTargeting": "device targeting recommendation",
  "estimatedPerformance": "brief performance prediction"
}

Before returning the response, validate that:
1. All headlines are between 15-30 characters
2. All descriptions are between 60-90 characters
3. No duplicate headlines or descriptions within the same ad group
4. Each ad group has exactly 3 headlines and 2 descriptions
5. The property names match exactly: "adGroups", "keywords", "headlines", "descriptions", "recommendedLocations"
6. Each ad group has exactly 5 keywords

Ensure all copy is professional, benefit-focused, and aligned with B2B service best practices.`,
      },
    ],
    temperature: 0.1,
    max_tokens: 3000,
  }),
};
