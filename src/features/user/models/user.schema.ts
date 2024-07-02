import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '../interfaces/roles.interface';

export type UserDocument = UserModel & Document;

@Schema({ timestamps: true, collection: 'users' })
export class UserModel {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [String],
    enum: UserRole,
    default: [UserRole.Buyer],
  })
  roles: UserRole[];

  @Prop()
  name: string;

  @Prop()
  walletAddress: string;

  @Prop()
  walletPrivateKey: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
