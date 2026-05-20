import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserConfigInterface } from 'src/dtos/config.interface';
import { User } from 'src/users/user.schema';
import { UserConfig } from './config.schema';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserConfig.name) private userConfigModel: Model<UserConfig>,
  ) {}

  async getConfig(userId: string): Promise<UserConfigInterface[] | void> {
    try {
      const user = await this.userModel.findById(userId);
      return user?.configs;
    } catch (error) {
      console.error(error);
    }
  }

  async createConfigAgainstId(
    userConfigObject: UserConfigInterface,
    userId: string,
  ): Promise<UserConfigInterface | void | HttpException> {
    try {
      const currentUser = await this.userModel.findById(userId);
      const currentUserId = currentUser ? currentUser._id.toString() : null;
      const updatedDocument = await this.userModel.findByIdAndUpdate(userId, { $push: { configs: userConfigObject } });
    return await this.userConfigModel.create(userConfigObject);
    } catch (error) {
      console.error(error);
      throw new HttpException('no such user', HttpStatus.NOT_FOUND);
    }
  }
}
