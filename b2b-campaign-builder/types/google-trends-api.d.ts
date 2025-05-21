declare module "google-trends-api" {
  interface TrendOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    timezone?: number;
    category?: number;
    property?: string;
    granularTimeResolution?: boolean;
  }

  interface RelatedQueriesOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    category?: number;
    property?: string;
  }

  interface InterestByRegionOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    resolution?: string;
    hl?: string;
    category?: number;
    property?: string;
  }

  function interestOverTime(options: TrendOptions): Promise<string>;
  function interestByRegion(options: InterestByRegionOptions): Promise<string>;
  function relatedTopics(options: TrendOptions): Promise<string>;
  function relatedQueries(options: RelatedQueriesOptions): Promise<string>;
  function dailyTrends(options: { geo: string; hl?: string }): Promise<string>;
  function realTimeTrends(options: {
    geo: string;
    category?: string;
    hl?: string;
  }): Promise<string>;

  export default {
    interestOverTime,
    interestByRegion,
    relatedTopics,
    relatedQueries,
    dailyTrends,
    realTimeTrends,
  };
}
