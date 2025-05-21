import { AppLayout } from "@/components/app-layout"
import { PageContainer } from "@/components/page-container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <AppLayout currentStep={3} isLoading={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Trend Analysis</h1>
        <p className="text-gray-600">We're analyzing search volume and trends to find the most valuable keywords</p>
      </div>

      {/* Info Box Skeleton */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
          <div className="w-full">
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-1.5" />
            <Skeleton className="h-4 w-full mb-1.5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <PageContainer className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-gray-50 p-3">
            <div className="grid grid-cols-5 gap-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`p-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="grid grid-cols-5 gap-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16 ml-auto" />
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Skeleton className="h-2 w-12" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>

      {/* Insights Skeleton */}
      <PageContainer>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
              <Skeleton className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </li>
          ))}
        </ul>
      </PageContainer>
    </AppLayout>
  )
}
