import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { FeedsParserService } from 'src/helpers/feeds-parser/feeds-parser.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    HttpModule,
  ],
  providers: [RssService, FeedsParserService],
  controllers: [RssController],
})
export class RssModule {}
