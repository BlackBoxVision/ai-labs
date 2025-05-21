import { AppLayout } from "@/components/app-layout"
import { PageContainer } from "@/components/page-container"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <AppLayout currentStep={4} isLoading={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Google Ads Campaign</h1>
        <p className="text-gray-600">We're creating a complete campaign structure ready to launch on Google Ads</p>
      </div>

      {/* Campaign Overview Skeleton */}
      <PageContainer className="mb-6">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-7 w-64 mb-4" />

        <div className="flex flex-wrap gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-40" />
            </div>
          ))}
        </div>

        <div className="mb-6">
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>

        <div className="border-t pt-4 flex flex-wrap gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-14 w-48 rounded-md" />
          ))}
        </div>
      </PageContainer>

      {/* Campaign Structure Explainer Skeleton */}
      <PageContainer className="mb-6">
        <Skeleton className="h-6 w-64 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <div className="w-full">
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </PageContainer>

      {/* Ad Groups and Preview Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-2 w-2 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-24 mt-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <PageContainer>
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-24" />
            </div>

            {/* Ad Preview Skeleton */}
            <div className="mb-6">
              <div className="border shadow-sm overflow-hidden rounded-lg">
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-full mb-1" />
                  <Skeleton className="h-5 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>

            {/* Keywords Skeleton */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                    <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Copy Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="mb-4">
                <Skeleton className="h-5 w-24 mb-2" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-blue-50 border border-blue-100 rounded px-3 py-2 mb-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <Skeleton className="h-5 w-28 mb-2" />
                {[1, 2].map((i) => (
                  <div key={i} className="bg-green-50 border border-green-100 rounded px-3 py-2 mb-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-full max-w-md" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PageContainer>
        </div>
      </div>

      {/* Campaign Insights Skeleton */}
      <PageContainer>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
              <Skeleton className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </li>
          ))}
        </ul>
      </PageContainer>
    </AppLayout>
  )
}
