declare module "google-trends-api" {
  interface TrendOptions {
    keyword?: string;
    keywords?: string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    timezone?: number;
    category?: number;
    property?: string;
    granularTimeResolution?: boolean;
  }

  // Export the module functions
  export function interestOverTime(options: TrendOptions): Promise<string>;
  export function interestByRegion(options: TrendOptions): Promise<string>;
  export function relatedQueries(options: TrendOptions): Promise<string>;
  export function relatedTopics(options: TrendOptions): Promise<string>;
  export function dailyTrends(options: TrendOptions): Promise<string>;
  export function realTimeTrends(options: TrendOptions): Promise<string>;

  export default {
    interestOverTime,
    interestByRegion,
    relatedQueries,
    relatedTopics,
    dailyTrends,
    realTimeTrends,
  };
}
