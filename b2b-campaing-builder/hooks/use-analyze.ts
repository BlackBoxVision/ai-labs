import { useQuery } from "@tanstack/react-query"
import { analyzeUrl } from "@/lib/api-service"
import type { ContentAnalysis } from "@/types/analyze"

export function useAnalyze(url: string | null) {
  return useQuery<ContentAnalysis, Error>({
    queryKey: ["analyze", url],
    queryFn: () => {
      if (!url) throw new Error("URL is required")
      return analyzeUrl(url)
    },
    enabled: !!url,
    staleTime: Number.POSITIVE_INFINITY, // This data doesn't change once fetched
  })
}
