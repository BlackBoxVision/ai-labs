"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Layers,
  Hash,
  MessageSquare,
  Lightbulb,
  Target,
  HelpCircle,
  Eye,
  Settings,
  Globe,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GoogleAdPreview } from "@/components/google-ad-preview";
import { PageContainer } from "@/components/page-container";
import { AppLayout } from "@/components/app-layout";
import { useCampaign } from "@/hooks/use-campaign";
import { NextStepsModal } from "@/components/next-steps-modal";

export default function CampaignPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url");

  const { data: campaign, isLoading, error, isError } = useCampaign(url);
  const [activeAdGroup, setActiveAdGroup] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set the active ad group when data is loaded
  useEffect(() => {
    if (campaign && campaign.adGroups.length > 0 && !activeAdGroup) {
      setActiveAdGroup(campaign.adGroups[0].name);
    }
  }, [campaign, activeAdGroup]);

  const getActiveAdGroup = () => {
    if (!campaign || !activeAdGroup) return null;
    return (
      campaign.adGroups.find((group) => group.name === activeAdGroup) || null
    );
  };

  const currentAdGroup = getActiveAdGroup();

  return (
    <AppLayout currentStep={4}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Google Ads Campaign</h1>
        <p className="text-gray-600">
          We've created a complete campaign structure ready to launch on Google
          Ads
        </p>
      </div>

      {/* Campaign Structure Info Alert */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">
              Understanding Your Campaign Structure
            </h4>
            <p className="text-sm text-blue-700 mb-2">
              Your Google Ads campaign is organized into several components that
              work together to target potential customers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
              <div className="flex items-start gap-2">
                <Layers className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Campaign:</strong> The top level that contains
                  settings like budget, location targeting, and ad schedule.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Ad Groups:</strong> Collections of related keywords
                  and ads that target a specific theme.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Hash className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Keywords:</strong> The search terms that will trigger
                  your ads to appear in search results.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Ad Copy:</strong> The text that appears in your ads,
                  including headlines and descriptions.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <PageContainer>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-opacity-50"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <Layers className="absolute inset-0 m-auto h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Generating campaign</h2>
            <p className="text-gray-600 mb-6">
              Creating optimized ad groups and ad copy
            </p>
            <Progress value={50} className="max-w-md mx-auto h-2" />
            <div className="mt-4 text-sm text-gray-500">
              Crafting ad copy...
            </div>
          </div>
        </PageContainer>
      ) : isError ? (
        <PageContainer>
          <div className="text-center">
            <p className="text-red-500 mb-6">
              {error?.message ||
                "Failed to generate campaign. Please try again."}
            </p>
            <Button
              onClick={() =>
                router.push("/trends?url=" + encodeURIComponent(url || ""))
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </PageContainer>
      ) : (
        <div className="space-y-6">
          {/* Campaign Overview Card */}
          <PageContainer>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-2">
              Campaign Overview
            </div>
            <h2 className="text-xl font-bold mb-2">{campaign?.name}</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-600" />
                <span>
                  Bid Strategy:{" "}
                  <span className="font-medium">
                    {campaign?.recommendedBidStrategy}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>
                  Targeting:{" "}
                  <span className="font-medium">
                    {campaign?.recommendedLocations.length} locations
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-600" />
                <span>
                  Ad Groups:{" "}
                  <span className="font-medium">
                    {campaign?.adGroups.length}
                  </span>
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                Target Locations
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64 text-sm">
                        These are the geographic areas where your ads will show
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <div className="flex flex-wrap gap-2">
                {campaign?.recommendedLocations.map((location, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </PageContainer>

          {/* Ad Groups Tabs Section */}
          <PageContainer>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Ad Groups
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-sm">
                      Select an ad group to see its keywords and preview its ads
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>

            {campaign && campaign.adGroups.length > 0 && (
              <Tabs
                value={activeAdGroup || campaign.adGroups[0].name}
                onValueChange={setActiveAdGroup}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-6 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
                  {campaign.adGroups.map((adGroup) => (
                    <TabsTrigger
                      key={adGroup.name}
                      value={adGroup.name}
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md"
                    >
                      {adGroup.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {campaign.adGroups.map((adGroup) => (
                  <TabsContent
                    key={adGroup.name}
                    value={adGroup.name}
                    className="mt-0"
                  >
                    <div className="space-y-6">
                      {/* Ad Preview Section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Eye className="h-5 w-5 text-blue-600" />
                          Ad Preview
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-64 text-sm">
                                  This is how your ad will appear in Google
                                  search results
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </h3>

                        <div className="mb-6">
                          <GoogleAdPreview
                            headline1={adGroup.headlines[0]}
                            headline2={adGroup.headlines[1]}
                            headline3={adGroup.headlines[2]}
                            description1={adGroup.descriptions[0]}
                            description2={adGroup.descriptions[1]}
                            finalUrl="https://yourcompany.com"
                            displayUrl="yourcompany.com"
                          />
                        </div>
                      </div>

                      {/* Keywords Section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Hash className="h-5 w-5 text-blue-600" />
                          Keywords
                        </h3>
                        <div className="mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {adGroup.keywords.map((keyword, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 bg-gray-50 p-2 rounded-md"
                              >
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-blue-600 text-xs font-bold">
                                    {index + 1}
                                  </span>
                                </div>
                                <span className="text-gray-700 text-sm">
                                  {keyword}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Ad Copy Section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                          Ad Copy
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Headlines
                            </h4>
                            {adGroup.headlines.map((headline, index) => (
                              <div
                                key={index}
                                className="bg-blue-50 border border-blue-100 rounded px-3 py-2 mb-2"
                              >
                                <div className="flex justify-between">
                                  <span className="font-medium">
                                    {headline}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {headline.length}/30 characters
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Descriptions
                            </h4>
                            {adGroup.descriptions.map((description, index) => (
                              <div
                                key={index}
                                className="bg-green-50 border border-green-100 rounded px-3 py-2 mb-2"
                              >
                                <div className="flex justify-between">
                                  <span>{description}</span>
                                  <span className="text-xs text-gray-500">
                                    {description.length}/90 characters
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </PageContainer>
        </div>
      )}

      {/* Next Steps Modal */}
      {campaign && (
        <NextStepsModal
          campaign={campaign}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </AppLayout>
  );
}
