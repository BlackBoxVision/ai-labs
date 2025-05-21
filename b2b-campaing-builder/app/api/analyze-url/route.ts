import { NextResponse } from "next/server";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { callOpenRouter, prompts } from "@/lib/openrouter-service";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
      // Use LangChain to fetch and extract content from the URL
      const loader = new CheerioWebBaseLoader(url);
      const docs = await loader.load();

      // Split the document into manageable chunks
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 10000,
        chunkOverlap: 200,
      });
      const splits = await textSplitter.splitDocuments(docs);

      // Get the first chunk of content for analysis
      const pageContent = splits[0].pageContent;

      // Analyze the extracted content using OpenRouter
      const result = await callOpenRouter(prompts.analyzeUrl(pageContent));

      // Check if parsedJson is available in the result
      if (result.parsedJson) {
        return NextResponse.json(result.parsedJson);
      }

      // Fallback to manual parsing if parsedJson is not available
      if (result.choices?.[0]?.message?.content) {
        try {
          const content = result.choices[0].message.content;
          const analysisData = JSON.parse(content);
          return NextResponse.json(analysisData);
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
    } catch (langchainError) {
      console.error("Error with LangChain processing:", langchainError);

      // Fallback for testing if LangChain has issues
      return NextResponse.json(
        {
          error: "Failed to process URL with LangChain",
          message:
            langchainError instanceof Error
              ? langchainError.message
              : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error analyzing URL:", error);
    return NextResponse.json(
      { error: "Failed to analyze URL" },
      { status: 500 }
    );
  }
}
