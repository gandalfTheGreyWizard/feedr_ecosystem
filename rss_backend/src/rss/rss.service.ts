import { Injectable } from '@nestjs/common';
import { FeedsParserService } from 'src/helpers/feeds-parser/feeds-parser.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserConfig } from 'src/config/config.schema';

@Injectable()
export class RssService {
  constructor(
    private feedsParserService: FeedsParserService,
    @InjectModel(UserConfig.name) private userConfigModel: Model<UserConfig>,
  ) {}

  async getFeedFromUrl(url: string): Promise<void> {
    await this.feedsParserService.parse_url(url);
  }

  async getFeedsAgainstUserId(userId: string): Promise<void> {
    const userConfig = await this.userConfigModel.findOne({ userId: userId });
    if (userConfig) {
      await Promise.all(userConfig.feedsList.map(async (eachFeed) => {
        console.log(eachFeed);
        await this.feedsParserService.parse_url(eachFeed.feedUrl);
      }));
    } else {
      console.log('no such user');
    }
  }
}
