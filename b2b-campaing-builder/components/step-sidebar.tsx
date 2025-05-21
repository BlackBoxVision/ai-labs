"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, HelpCircle, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NextStepsModal } from "@/components/next-steps-modal";
import { useCampaign } from "@/hooks/use-campaign";

interface StepSidebarProps {
  currentStep: number;
  isLoading?: boolean;
}

export function StepSidebar({
  currentStep,
  isLoading = false,
}: StepSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Only fetch campaign data if we're on the campaign step
  const { data: campaign } = useCampaign(currentStep === 4 ? url : null);

  const steps = [
    {
      number: 1,
      name: "Analyze",
      path: "/analyze",
      description:
        "We analyze your website content to understand your business",
      icon: "🔍",
    },
    {
      number: 2,
      name: "Keywords",
      path: "/keywords",
      description: "Generate relevant keywords based on your business",
      icon: "#️⃣",
    },
    {
      number: 3,
      name: "Trends",
      path: "/trends",
      description: "Analyze search volume and trends for your keywords",
      icon: "📈",
    },
    {
      number: 4,
      name: "Campaign",
      path: "/campaign",
      description: "Create optimized ad groups and ad copy",
      icon: "🚀",
    },
  ];

  const handleStepClick = (stepNumber: number, path: string) => {
    // Only allow navigation to completed steps or the current step
    if (stepNumber <= currentStep && url) {
      router.push(`${path}?url=${encodeURIComponent(url)}`);
    }
  };

  const currentStepData = steps.find((step) => step.number === currentStep);
  const nextStep = steps.find((step) => step.number === currentStep + 1);

  const handleNextStep = () => {
    if (nextStep && url) {
      router.push(`${nextStep.path}?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Campaign Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Step {currentStep} of 4:{" "}
          <span className="font-medium">{currentStepData?.name}</span>
        </p>
      </div>

      {/* Scrollable steps section */}
      <div className="flex-1 overflow-y-auto pr-1 -mr-1">
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              onClick={() => handleStepClick(step.number, step.path)}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all
                ${
                  step.number <= currentStep
                    ? "cursor-pointer hover:bg-gray-50"
                    : "opacity-60 cursor-not-allowed"
                }
                ${step.number === currentStep ? "bg-blue-50" : ""}
              `}
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                  ${
                    step.number < currentStep
                      ? "bg-green-100 text-green-600"
                      : step.number === currentStep
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                {step.number < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-lg">{step.icon}</span>
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <h3
                    className={`font-medium ${
                      step.number === currentStep
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {step.name}
                  </h3>
                  {step.number === currentStep && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-blue-600 ml-1.5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64 text-sm">{step.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed button section */}
      <div className="mt-6 pt-4 border-t space-y-3">
        {currentStep === 4 && campaign ? (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="mr-2">Loading...</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export Campaign
              </>
            )}
          </Button>
        ) : nextStep ? (
          <Button
            onClick={handleNextStep}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="mr-2">Loading...</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </>
            ) : (
              <>
                Next: {nextStep.name}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : null}
      </div>

      {/* Next Steps Modal */}
      {campaign && (
        <NextStepsModal
          campaign={campaign}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}
