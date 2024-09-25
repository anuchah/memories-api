import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/configs/multer-config.service';
import { User, UserSchema } from '../user/schema/user.schema';
import { Like, LikeSchema } from '../like/schema/like.schema';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    LikeModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
