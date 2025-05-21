import { Skeleton } from "@/components/ui/skeleton"

export function StepSidebarSkeleton({ currentStep = 1 }: { currentStep?: number }) {
  return (
    <div className="h-full flex flex-col p-6">
      {/* Header section */}
      <div className="mb-6">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-2.5 w-full rounded-full mb-4" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Scrollable steps section */}
      <div className="flex-1 overflow-y-auto pr-1 -mr-1">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`
                flex items-center gap-3 p-3 rounded-lg
                ${step === currentStep ? "bg-blue-50" : ""}
              `}
            >
              <Skeleton
                className={`
                  w-10 h-10 rounded-full flex-shrink-0
                  ${step === currentStep ? "bg-blue-200" : "bg-gray-200"}
                `}
              />
              <div className="w-full">
                <div className="flex items-center">
                  <Skeleton className={`h-5 w-24 ${step === currentStep ? "bg-blue-200" : ""}`} />
                  {step === currentStep && <Skeleton className="h-4 w-4 ml-1.5 rounded-full bg-blue-200" />}
                </div>
                <Skeleton className="h-3 w-full mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed button section */}
      {currentStep < 4 && (
        <div className="mt-6 pt-4 border-t">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      )}
    </div>
  )
}
