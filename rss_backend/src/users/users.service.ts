import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { UserInterface } from '../dtos/user.interface';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserObject: UserInterface): Promise<UserInterface> {
    const createdUser = await this.userModel.create(createUserObject);
    return createdUser;
  }
}
