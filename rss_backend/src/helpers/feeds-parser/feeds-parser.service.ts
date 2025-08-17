import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as RSSParser from 'rss-parser';

@Injectable()
export class FeedsParserService {
  constructor(private httpService: HttpService) {}
  parser: RSSParser = new RSSParser();

  async parse_url(url: string): Promise<void> {
    const feed = await this.parser.parseURL(url);
    feed.items.forEach((eachItem) => {
      console.log(eachItem);
    });
    console.log(feed.title);
  }
}
