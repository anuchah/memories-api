import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Like } from 'src/modules/like/schema/like.schema';
import { Post } from 'src/modules/post/schema/post.schema';

export type UserDocment = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  bio?: string;

  @Prop({ required: false, name: 'profile_picture' })
  profilePicture?: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Post' }] })
  posts: Post[];

  @Prop({ type: [{ type: 'ObjectId', ref: 'Like' }] })
  likes: Like[];
}

export const UserSchema = SchemaFactory.createForClass(User);
