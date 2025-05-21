"use client"

import { CheckCircle, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  const router = useRouter()

  const steps = [
    {
      number: 1,
      name: "Analyze",
      path: "/analyze",
      description: "We analyze your website content to understand your business",
    },
    {
      number: 2,
      name: "Keywords",
      path: "/keywords",
      description: "Generate relevant keywords based on your business",
    },
    {
      number: 3,
      name: "Trends",
      path: "/trends",
      description: "Analyze search volume and trends for your keywords",
    },
    {
      number: 4,
      name: "Campaign",
      path: "/campaign",
      description: "Create optimized ad groups and ad copy",
    },
  ]

  const handleStepClick = (stepNumber: number, path: string) => {
    // Only allow navigation to completed steps or the current step
    if (stepNumber <= currentStep) {
      // Get the current URL parameters
      const url = new URL(window.location.href)
      const urlParam = url.searchParams.get("url")

      if (urlParam) {
        router.push(`${path}?url=${encodeURIComponent(urlParam)}`)
      }
    }
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center relative"
            onClick={() => handleStepClick(step.number, step.path)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`group ${step.number <= currentStep ? "cursor-pointer" : "cursor-not-allowed"}`}>
                    {step.number < currentStep ? (
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          step.number === currentStep ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.number}
                      </div>
                    )}
                    <span
                      className={`text-sm ${step.number === currentStep ? "font-medium text-blue-600" : "text-gray-500"}`}
                    >
                      {step.name}
                    </span>
                    {step.number === currentStep && (
                      <span className="absolute top-0 right-0 -mt-1 -mr-1">
                        <HelpCircle className="h-4 w-4 text-blue-600" />
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-48 text-sm">{step.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto mt-2">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
        <div
          className="absolute top-0 left-0 h-1 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
