import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    files: Array<Express.Multer.File>,
    userId: string,
  ): Promise<Post> {
    try {
      if (files && files.length > 0) {
        createPostDto.images = files.map((file) => file.path);
      }
      createPostDto.user = userId;

      const result = new this.postModel(createPostDto);
      const savedPost = await result.save();

      await this.userModel.findByIdAndUpdate(userId, {
        $push: {
          posts: savedPost._id,
        },
      });

      return savedPost;
    } catch (error) {
      throw { error };
    }
  }

  async findAll(userId: string): Promise<PostDocument[]> {
    try {
      const posts = await this.postModel
        .find({ user: userId })
        .populate('user')
        .exec();

      return posts;
    } catch (error) {
      throw { error };
    }
  }
}
