import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async uploadProfile(
    userId: string,
    file: Express.Multer.File,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(userId, {
          profilePicture: file.path,
        })
        .exec();

      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: 200,
        message: 'Upload profile successfuly',
      };
    } catch (error) {
      throw { error };
    }
  }
}
