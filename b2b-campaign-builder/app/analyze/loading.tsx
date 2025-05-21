import { AppLayout } from "@/components/app-layout"
import { PageContainer } from "@/components/page-container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <AppLayout currentStep={1} isLoading={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Content Analysis</h1>
        <p className="text-gray-600">We're analyzing your website to understand what makes your business unique</p>
      </div>

      {/* Website Summary Skeleton */}
      <PageContainer className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </PageContainer>

      {/* Topics and Audience Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PageContainer>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </PageContainer>

        <PageContainer>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-28 rounded-full" />
            ))}
          </div>
        </PageContainer>
      </div>

      {/* Selling Points Skeleton */}
      <PageContainer className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="flex items-start gap-2">
              <Skeleton className="h-5 w-5 rounded-full flex-shrink-0 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </li>
          ))}
        </ul>
      </PageContainer>

      {/* User Intent Skeleton */}
      <PageContainer>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5" />
      </PageContainer>
    </AppLayout>
  )
}
