export interface Feed {
  feedName: string;
  feedSource: string;
  feedUrl: string;
}

export interface UserConfigInterface {
  feedName: string;
  feedUrl: string;
  feedClass: string;
  customParser: boolean;
}

export interface GetConfigParams {
  userId: string;
}

export interface FeedsUrlSqlList {
  userId: number;
  feed_name: string;
  feed_source: string;
  feed_url: string;
}
