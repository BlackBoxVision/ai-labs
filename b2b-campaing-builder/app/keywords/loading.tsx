import { AppLayout } from "@/components/app-layout"
import { PageContainer } from "@/components/page-container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <AppLayout currentStep={2} isLoading={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Keyword Generation</h1>
        <p className="text-gray-600">These are the search terms potential customers use to find services like yours</p>
      </div>

      {/* Keywords Generated Summary Skeleton */}
      <PageContainer className="text-center mb-6">
        <Skeleton className="h-6 w-40 mx-auto mb-3" />
        <Skeleton className="h-8 w-64 mx-auto" />
      </PageContainer>

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

      {/* Tabs Skeleton */}
      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 rounded-md" />
          ))}
        </div>

        <PageContainer>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-32 rounded-full" />
            ))}
          </div>
        </PageContainer>
      </div>
    </AppLayout>
  )
}
