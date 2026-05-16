export interface Feed {
  feedName: string;
  feedSource: string;
  feedUrl: string;
}

export interface UserConfigInterface {
  userId: string;
  feedsList: Feed[];
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
