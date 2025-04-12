import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole, USER_ROLES } from '../enums/user-role.enum';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ required: true, enum: USER_ROLES })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
