import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserConfigSchema, UserConfig } from '../config/config.schema';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop([UserConfigSchema])
  configs: UserConfig[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocumentOvveride = {
  config: Types.Subdocument<Types.ObjectId> & UserConfig;
};
export type UserDocument = HydratedDocument<User>;
