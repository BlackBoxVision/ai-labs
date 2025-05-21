import { NextResponse } from "next/server";
import {
  callOpenRouter,
  prompts,
  AnalysisData,
} from "@/lib/openrouter-service";

export async function POST(request: Request) {
  try {
    const { analysis } = await request.json();

    if (!analysis) {
      return NextResponse.json(
        { error: "Content analysis is required" },
        { status: 400 }
      );
    }

    // Use OpenRouter to generate keywords
    const result = await callOpenRouter(
      prompts.generateKeywords(analysis as AnalysisData)
    );

    // Check if parsedJson is available in the result
    if (result.parsedJson) {
      return NextResponse.json(result.parsedJson);
    }

    // Fallback to manual parsing if parsedJson is not available
    if (result.choices?.[0]?.message?.content) {
      try {
        const content = result.choices[0].message.content;
        const keywordsData = JSON.parse(content);
        return NextResponse.json(keywordsData);
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
    console.error("Error generating keywords:", error);
    return NextResponse.json(
      { error: "Failed to generate keywords" },
      { status: 500 }
    );
  }
}
