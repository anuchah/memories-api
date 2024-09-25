import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './schema/like.schema';
import { Post, PostSchema } from '../post/schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
