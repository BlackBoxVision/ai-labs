"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Hash, HelpCircle, Lightbulb } from "lucide-react";
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
import { useKeywords } from "@/hooks/use-keywords";

export default function KeywordsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url");

  const { data, isLoading, error, isError } = useKeywords(url);
  const keywordClusters = data?.clusters || [];
  const totalKeywords = keywordClusters.reduce(
    (total, cluster) => total + cluster.keywords.length,
    0
  );

  return (
    <AppLayout currentStep={2} isLoading={isLoading}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Keyword Generation</h1>
        <p className="text-gray-600">
          These are the search terms potential customers use to find services
          like yours
        </p>
      </div>

      {/* Info Alert - After title and description */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">
              What are keyword clusters?
            </h4>
            <p className="text-sm text-blue-700">
              Keywords are grouped into clusters based on their theme. This
              helps organize your Google Ads campaign into focused ad groups,
              which typically leads to better performance.
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
              <BarChart3 className="absolute inset-0 m-auto h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Generating keywords</h2>
            <p className="text-gray-600 mb-6">
              Creating relevant B2B keywords based on your website
            </p>
            <Progress value={50} className="max-w-md mx-auto h-2" />
            <div className="mt-4 text-sm text-gray-500">
              Generating keyword variations...
            </div>
          </div>
        </PageContainer>
      ) : isError ? (
        <PageContainer>
          <div className="text-center">
            <p className="text-red-500 mb-6">
              {error?.message ||
                "Failed to generate keywords. Please try again."}
            </p>
            <Button
              onClick={() =>
                router.push("/analyze?url=" + encodeURIComponent(url || ""))
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </PageContainer>
      ) : (
        <div className="space-y-6">
          <PageContainer className="text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-3">
              Keywords Generated
            </div>
            <p className="text-xl font-bold">
              <span className="text-blue-600">{totalKeywords}</span> keywords in{" "}
              <span className="text-blue-600">{keywordClusters.length}</span>{" "}
              clusters
            </p>
          </PageContainer>

          <Tabs defaultValue={keywordClusters[0]?.name || ""} className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
              {keywordClusters.map((cluster) => (
                <TabsTrigger
                  key={cluster.name}
                  value={cluster.name}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md"
                >
                  {cluster.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {keywordClusters.map((cluster) => (
              <TabsContent key={cluster.name} value={cluster.name}>
                <PageContainer>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Hash className="h-4 w-4" />
                    </span>
                    <h3 className="text-lg font-semibold">
                      {cluster.name} Keywords
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64 text-sm">
                            {cluster.name === "Commercial Intent"
                              ? "These keywords show that users are ready to buy or are actively looking for solutions"
                              : cluster.name === "Cloud Security"
                              ? "These keywords focus on the main topic of your business"
                              : cluster.name === "Compliance"
                              ? "These keywords target users concerned with regulatory compliance"
                              : "These keywords target enterprise-level decision makers"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cluster.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm py-1.5 px-3 bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </PageContainer>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </AppLayout>
  );
}
