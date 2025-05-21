import { useQuery } from "@tanstack/react-query"
import { analyzeTrends } from "@/lib/api-service"
import type { KeywordTrend } from "@/types/trends"
import { useKeywords } from "./use-keywords"

export function useTrends(url: string | null) {
  const keywordsQuery = useKeywords(url)

  return useQuery<{ trends: KeywordTrend[] }, Error>({
    queryKey: ["trends", url],
    queryFn: () => {
      if (!keywordsQuery.data?.clusters) throw new Error("Keywords data is required")

      // Extract all keywords from all clusters
      const allKeywords = keywordsQuery.data.clusters.flatMap((cluster) => cluster.keywords)

      return analyzeTrends(allKeywords)
    },
    enabled: !!keywordsQuery.data?.clusters,
    staleTime: Number.POSITIVE_INFINITY, // This data doesn't change once fetched
  })
}
