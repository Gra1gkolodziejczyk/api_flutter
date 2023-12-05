import { Module, forwardRef } from '@nestjs/common';
import { User, UserSchema } from 'src/schemas/user.schema';

import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserServices } from './services/user.service';
import { UsersController } from './controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}
