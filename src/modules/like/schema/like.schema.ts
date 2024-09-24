import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/modules/post/schema/post.schema';
import { User } from 'src/modules/user/schema/user.schema';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  post: Post;

  @Prop({ default: Date.now, name: 'created_at' })
  createdAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
