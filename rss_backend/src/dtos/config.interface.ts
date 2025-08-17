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
