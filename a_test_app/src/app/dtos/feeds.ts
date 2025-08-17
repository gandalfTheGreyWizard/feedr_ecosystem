export interface MediaFields {
  url?: String,
  width: Number,
  height: Number,
}

export interface Feed {
  authors: String,
  authorDetail: String,
  href: String,
  author: String,
  tags: String,
  content: String,
  summary: String,
  link: String,
  links: String,
  title: String,
  titleDetails: String,
  media_thumbnail: MediaFields[],
  feedName: String,
  feedType: String,
}
export interface FeedSource {
  feedSource: String,
  feeds: Feed[]
}
export interface Data {
  entries: FeedSource[],
  feedSources: String[],
}
