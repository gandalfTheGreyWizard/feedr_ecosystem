import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  UserConfigInterface,
  GetConfigParams,
  FeedsUrlSqlList,
} from 'src/dtos/config.interface';

@Controller('config')
export class ConfigController {
  constructor(
    private configService: ConfigService,
  ) {}

  @Get(':userId')
  async getUserConfig(@Param('userId') userId: string): Promise<UserConfigInterface[] | void> {
    return await this.configService.getConfig(userId);
  }

  @Post('create/:userId')
  async createConfigAgainstId(
    @Body() createConfigObject: UserConfigInterface,
    @Param('userId') userId: string,
  ): Promise<UserConfigInterface | void> {
    await this.configService.createConfigAgainstId(createConfigObject, userId);
  }
}
