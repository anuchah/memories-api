import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Like } from 'src/modules/like/schema/like.schema';
import { User } from 'src/modules/user/schema/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], required: false })
  images?: string[];

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  user: User;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Like' }] })
  likes: Like[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
