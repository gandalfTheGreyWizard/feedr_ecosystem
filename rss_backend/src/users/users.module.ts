import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema, User } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserConfig, UserConfigSchema } from 'src/config/config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserConfig.name, schema: UserConfigSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
