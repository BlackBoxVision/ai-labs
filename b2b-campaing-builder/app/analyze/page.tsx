"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Search, Users, Target, Lightbulb, HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PageContainer } from "@/components/page-container";
import { AppLayout } from "@/components/app-layout";
import { useAnalyze } from "@/hooks/use-analyze";

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url");

  const { data: analysis, isLoading, error, isError } = useAnalyze(url);

  return (
    <AppLayout currentStep={1} isLoading={isLoading}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Content Analysis</h1>
        <p className="text-gray-600">
          We've analyzed your website to understand what makes your business
          unique
        </p>
      </div>

      {/* Pro Tip Alert - After title and description */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Pro Tip</h4>
            <p className="text-sm text-blue-700">
              Review the analysis below to make sure it accurately reflects your
              business. The more accurate this information is, the better your
              ad campaign will perform.
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <PageContainer>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-opacity-50"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <Search className="absolute inset-0 m-auto h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-3">
              Analyzing your website
            </h2>
            <p className="text-gray-600 mb-6">
              We're extracting key information from{" "}
              <span className="font-medium text-gray-900">{url}</span>
            </p>
            <Progress value={50} className="max-w-md mx-auto h-2" />
            <div className="mt-4 text-sm text-gray-500">
              Analyzing content...
            </div>
          </div>
        </PageContainer>
      ) : isError ? (
        <PageContainer>
          <div className="text-center">
            <p className="text-red-500 mb-6">
              {error?.message ||
                "Failed to analyze the landing page. Please try again."}
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </PageContainer>
      ) : (
        <div className="space-y-6">
          <PageContainer>
            <CardTitle className="text-xl flex items-center gap-2 mb-4">
              Website Summary
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-sm">
                      This is our AI's understanding of your business based on
                      your website content
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <p className="text-gray-700">{analysis?.summary}</p>
          </PageContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PageContainer>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Key Topics</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64 text-sm">
                        These are the main topics your website focuses on. Your
                        ads will target these areas.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis?.topics.map((topic, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-1 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </PageContainer>

            <PageContainer>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Target Audience</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64 text-sm">
                        These are the people most likely to be interested in
                        your service. Your ads will be tailored to them.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis?.audience.map((audience, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-1 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {audience}
                  </Badge>
                ))}
              </div>
            </PageContainer>
          </div>

          <PageContainer>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Key Selling Points</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-sm">
                      These are your unique advantages that will be highlighted
                      in your ad copy
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis?.sellingPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </PageContainer>

          <PageContainer>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">User Intent</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-sm">
                      This describes what your potential customers are looking
                      for when they search online
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-gray-700">{analysis?.intent}</p>
          </PageContainer>
        </div>
      )}
    </AppLayout>
  );
}
