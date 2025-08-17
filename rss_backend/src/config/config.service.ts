import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserConfig } from './config.schema';
import { UserConfigInterface } from 'src/dtos/config.interface';
import { User } from 'src/users/user.schema';

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel(UserConfig.name) private userConfigModel: Model<UserConfig>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async listConfigs(): Promise<UserConfigInterface | null> {
    try {
      const findOneData = await this.userConfigModel.findOne();
      console.log(findOneData);
    } catch (error) {
      console.error(error);
    }
    return await this.userConfigModel.findOne();
  }

  //async createConfig(
    //userConfigObject: UserConfigInterface,
  //): Promise<UserConfigInterface> {
    //return await this.userConfigModel.create(userConfigObject);
  //}
  async createConfigAgainstId(
    userConfigObject: UserConfigInterface,
    userId: string,
  ): Promise<UserConfigInterface | void> {
    try {
      const currentUser = await this.userModel.findById(userId);
      const currentUserId = currentUser ? currentUser._id.toString() : null;
      if (currentUserId) {
        userConfigObject.userId = currentUserId;
        //const currentUserConfig = await this.userConfigModel.findOne({
          //userId: currentUserId,
        //});
        await this.userConfigModel.updateOne(
          { userId: currentUserId },
          userConfigObject,
          { upsert: true },
        );
      }
    } catch (error) {
      console.error(error);
    }
    //return await this.userConfigModel.create(userConfigObject);
  }
}
