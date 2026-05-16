import { Controller, Get, Body, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UserConfigInterface, GetConfigParams, FeedsUrlSqlList } from 'src/dtos/config.interface';
import { PrismaserviceService } from '../prismaservice/prismaservice.service';

@Controller('config')
export class ConfigController {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaserviceService,
  ) {}

  @Get()
  async getUserConfig(): Promise<UserConfigInterface | null> {
    return await this.configService.listConfigs();
  }

  //@Post('create-config')
  //async createConfig(
    //@Body() createConfigObject: UserConfigInterface,
  //): Promise<UserConfigInterface> {
    //return await this.configService.createConfig(createConfigObject);
  //}

  @Post('create-config/:userId')
  async createConfigAgainstId(
    @Body() createConfigObject: UserConfigInterface,
    @Param('userId') userId: string,
  ): Promise<UserConfigInterface | void> {
    await this.configService.createConfigAgainstId(createConfigObject, userId);
  }

  @Post('/user/:userId')
  async createConfigAgainstUserIdInSql(
    @Body() createConfigObject: UserConfigInterface,
    @Param('userId') userId: string,
  ): Promise<UserConfigInterface | void> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (user) {
      const feedsUrlList: FeedsUrlSqlList[] = [];
      createConfigObject.feedsList.forEach((eachFeed) => {
        const data: FeedsUrlSqlList = {
          feed_name: eachFeed.feedName,
          feed_source: eachFeed.feedSource,
          feed_url: eachFeed.feedUrl,
          userId: Number(userId),
        };
        feedsUrlList.push(data);
      });
      await this.prismaService.config.createMany({
        data: feedsUrlList,
      });
    } else {
      throw new HttpException(
        { message: 'no such user found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
