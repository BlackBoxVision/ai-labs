export interface AdGroup {
  name: string
  keywords: string[]
  headlines: string[]
  descriptions: string[]
}

export interface Campaign {
  name: string
  adGroups: AdGroup[]
  recommendedBidStrategy: string
  recommendedLocations: string[]
}
