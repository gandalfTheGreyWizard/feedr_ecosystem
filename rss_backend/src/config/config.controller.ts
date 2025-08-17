import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UserConfigInterface, GetConfigParams } from 'src/dtos/config.interface';

@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

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
}
