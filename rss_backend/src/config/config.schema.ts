import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserConfig>;

const feedClasses = ['default'];

@Schema()
export class UserConfig {
  @Prop()
  feedName: string;

  @Prop()
  feedUrl: string;

  @Prop({ enum: feedClasses })
  feedClass: string;

  @Prop()
  customParser: boolean;
}

export const UserConfigSchema = SchemaFactory.createForClass(UserConfig);
