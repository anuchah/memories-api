import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/core/utils/passwordHasher';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hashPassword(createUserDto.password);
    const result = new this.userModel(createUserDto);
    return result.save();
  }

  async findOne(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
