import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { FeedsParserService } from './helpers/feeds-parser/feeds-parser.service';
import { HttpModule } from '@nestjs/axios';
import { RssModule } from './rss/rss.module';
import { PrismaserviceService } from './prismaservice/prismaservice.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27019/rss_feeds_reader?authSource=admin',
    ),
    UsersModule,
    ConfigModule,
    HttpModule,
    RssModule,
  ],
  controllers: [AppController],
  providers: [AppService, FeedsParserService, PrismaserviceService],
})
export class AppModule {}
