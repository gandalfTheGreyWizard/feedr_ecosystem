import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Feed } from '../dtos/config.interface';

@Schema()
export class UserConfig {
  @Prop()
  userId: string;

  @Prop()
  feedsList: Feed[];
}

export const UserConfigSchema = SchemaFactory.createForClass(UserConfig);
