import { Controller, Get, Param } from '@nestjs/common';
import { RssService } from './rss.service';
@Controller('rss')
export class RssController {
  constructor(private rssService: RssService) {}

  @Get()
  async get_static_feed(): Promise<void> {
    const url = 'https://www.reddit.com/r/java.rss';
    await this.rssService.getFeedFromUrl(url);
  }

  @Get('user-id/:userId')
  async getFeedsAgainstUserConfig(
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.rssService.getFeedsAgainstUserId(userId);
  }
}
