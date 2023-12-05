import * as bcrypt from 'bcrypt';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true, minlength: 3 })
  username: string;
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = bcrypt.hashSync(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
