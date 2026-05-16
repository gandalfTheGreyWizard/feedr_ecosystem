import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema, User } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaserviceService } from '../prismaservice/prismaservice.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaserviceService],
})
export class UsersModule {}
