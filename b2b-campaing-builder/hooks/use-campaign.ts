import { useQuery } from "@tanstack/react-query"
import { generateCampaign } from "@/lib/api-service"
import type { Campaign } from "@/types/campaign"
import { useAnalyze } from "./use-analyze"
import { useKeywords } from "./use-keywords"
import { useTrends } from "./use-trends"

export function useCampaign(url: string | null) {
  const analyzeQuery = useAnalyze(url)
  const keywordsQuery = useKeywords(url)
  const trendsQuery = useTrends(url)

  return useQuery<Campaign, Error>({
    queryKey: ["campaign", url],
    queryFn: () => {
      if (!analyzeQuery.data) throw new Error("Analysis data is required")
      if (!keywordsQuery.data?.clusters) throw new Error("Keywords data is required")
      if (!trendsQuery.data?.trends) throw new Error("Trends data is required")

      return generateCampaign(analyzeQuery.data, keywordsQuery.data.clusters, trendsQuery.data.trends)
    },
    enabled: !!(analyzeQuery.data && keywordsQuery.data?.clusters && trendsQuery.data?.trends),
    staleTime: Number.POSITIVE_INFINITY, // This data doesn't change once fetched
  })
}
