"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PageContainer } from "@/components/page-container";
import { AppLayout } from "@/components/app-layout";
import { useTrends } from "@/hooks/use-trends";

export default function TrendsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url");

  const { data, isLoading, error, isError } = useTrends(url);
  const keywordTrends = data?.trends || [];

  return (
    <AppLayout currentStep={3} isLoading={isLoading}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Trend Analysis</h1>
        <p className="text-gray-600">
          We've analyzed search volume and trends to find the most valuable
          keywords
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
              Understanding Keyword Trends
            </h4>
            <p className="text-sm text-blue-700">
              Keywords with higher search volume and upward trends typically
              perform better. We've calculated a relevance score to help you
              identify the most valuable keywords for your campaign.
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
              <TrendingUp className="absolute inset-0 m-auto h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-3">
              Analyzing keyword trends
            </h2>
            <p className="text-gray-600 mb-6">
              Checking search volume and growth trends
            </p>
            <Progress value={50} className="max-w-md mx-auto h-2" />
            <div className="mt-4 text-sm text-gray-500">
              Analyzing growth trends...
            </div>
          </div>
        </PageContainer>
      ) : isError ? (
        <PageContainer>
          <div className="text-center">
            <p className="text-red-500 mb-6">
              {error?.message ||
                "Failed to analyze keyword trends. Please try again."}
            </p>
            <Button
              onClick={() =>
                router.push("/keywords?url=" + encodeURIComponent(url || ""))
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </PageContainer>
      ) : (
        <div className="space-y-6">
          <PageContainer>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Lightbulb className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-semibold">Trend Analysis Insights</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-sm">
                      Key findings from our analysis to help you understand the
                      market
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  Commercial intent keywords show strong growth potential
                </span>
              </li>
              <li className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Compliance-related terms have high search volume</span>
              </li>
              <li className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>
                  Enterprise security assessment terms are declining in
                  popularity
                </span>
              </li>
              <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <Minus className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <span>Cloud security monitoring terms remain stable</span>
              </li>
            </ul>
          </PageContainer>
          <PageContainer>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <BarChart3 className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-semibold">Top Performing Keywords</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-sm">
                      These keywords are ranked by our relevance score, which
                      considers search volume, trends, and relevance to your
                      business
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">
                      Keyword
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 ml-1 inline" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-48 text-sm">
                              The search term users type into Google
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="font-semibold">
                      Cluster
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 ml-1 inline" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-48 text-sm">
                              The keyword group this belongs to
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      Search Volume
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 ml-1 inline" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-48 text-sm">
                              Estimated monthly searches
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Trend
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 ml-1 inline" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-48 text-sm">
                              Whether searches are increasing, stable, or
                              decreasing
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      Score
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 ml-1 inline" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-48 text-sm">
                              Our relevance score out of 100
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywordTrends.map((item, index) => (
                    <TableRow
                      key={item.keyword}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <TableCell className="font-medium">
                        {item.keyword}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                          {item.cluster}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {item.volume.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.trend === "up" && (
                          <TrendingUp className="h-5 w-5 text-green-500 inline" />
                        )}
                        {item.trend === "down" && (
                          <TrendingDown className="h-5 w-5 text-red-500 inline" />
                        )}
                        {item.trend === "stable" && (
                          <Minus className="h-5 w-5 text-gray-500 inline" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.score > 80
                                  ? "bg-green-500"
                                  : item.score > 70
                                  ? "bg-blue-500"
                                  : item.score > 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{item.score}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PageContainer>
        </div>
      )}
    </AppLayout>
  );
}
