import { NextResponse } from "next/server";
import {
  callOpenRouter,
  prompts,
  AnalysisData,
  Trend,
} from "@/lib/openrouter-service";

export async function POST(request: Request) {
  try {
    const { analysis, keywords, trends } = await request.json();

    if (!analysis || !keywords || !trends) {
      return NextResponse.json(
        { error: "Analysis, keywords, and trends data are required" },
        { status: 400 }
      );
    }

    // Use OpenRouter to generate campaign structure
    const result = await callOpenRouter(
      prompts.generateCampaign(analysis as AnalysisData, trends as Trend[])
    );

    // Check if parsedJson is available in the result
    if (result.parsedJson) {
      return NextResponse.json(result.parsedJson);
    }

    // Fallback to manual parsing if parsedJson is not available
    if (result.choices?.[0]?.message?.content) {
      try {
        const content = result.choices[0].message.content;
        const campaignData = JSON.parse(content);
        return NextResponse.json(campaignData);
      } catch (parseError) {
        console.error("Error parsing JSON from content:", parseError);
        return NextResponse.json(
          { error: "Failed to parse response from AI model" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Invalid response from AI model" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error generating campaign:", error);
    return NextResponse.json(
      { error: "Failed to generate campaign structure" },
      { status: 500 }
    );
  }
}
