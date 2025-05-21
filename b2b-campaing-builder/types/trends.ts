export interface KeywordTrend {
  keyword: string
  volume: number
  trend: "up" | "down" | "stable"
  score: number
  cluster: string
}
