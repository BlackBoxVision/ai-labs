import { useQuery } from "@tanstack/react-query"
import { generateKeywords } from "@/lib/api-service"
import type { KeywordCluster } from "@/types/keywords"
import { useAnalyze } from "./use-analyze"

export function useKeywords(url: string | null) {
  const analyzeQuery = useAnalyze(url)

  return useQuery<{ clusters: KeywordCluster[] }, Error>({
    queryKey: ["keywords", url],
    queryFn: () => {
      if (!analyzeQuery.data) throw new Error("Analysis data is required")
      return generateKeywords(analyzeQuery.data)
    },
    enabled: !!analyzeQuery.data,
    staleTime: Number.POSITIVE_INFINITY, // This data doesn't change once fetched
  })
}
