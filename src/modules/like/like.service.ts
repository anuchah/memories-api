import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './schema/like.schema';
import { Connection, Model } from 'mongoose';
import { Post, PostDocument } from '../post/schema/post.schema';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async likePost(likeDto: LikeDto): Promise<{ message: string }> {
    try {
      const existingLike = await this.likeModel
        .findOne({ user: likeDto.userId, post: likeDto.postId })
        .exec();

      if (existingLike) {
        await this.postModel
          .findByIdAndUpdate(likeDto.postId, { $inc: { likeCount: -1 } })
          .exec();

        await this.likeModel
          .deleteOne({ user: likeDto.userId, post: likeDto.postId })
          .exec();

        return { message: `Unlike post by user id ${likeDto.userId}` };
      }

      const result = new this.likeModel({
        user: likeDto.userId,
        post: likeDto.postId,
      });
      await result.save();

      await this.postModel
        .findByIdAndUpdate(likeDto.postId, { $inc: { likeCount: 1 } })
        .exec();
      return {
        message: `Like post by user id ${likeDto.userId}`,
      };
    } catch (error) {
      throw { error };
    }
  }
}
