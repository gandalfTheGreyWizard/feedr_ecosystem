import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserConfig, UserConfigSchema } from './config.schema';
import { UserSchema, User } from 'src/users/user.schema';
import { PrismaserviceService } from '../prismaservice/prismaservice.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserConfig.name, schema: UserConfigSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ConfigController],
  providers: [ConfigService, PrismaserviceService],
})
export class ConfigModule {}
