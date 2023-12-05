import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/update.dto';

@Injectable()
export class UserServices {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  register(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async updateUser(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = this.userModel.findOneAndUpdate(
      { email },
      updateUserDto,
    );
    if (!updateUser) {
      throw new NotFoundException(`User with mail ${email} not found.`);
    }
    return updateUser;
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }
}
