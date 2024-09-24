import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Like } from 'src/modules/like/schema/like.schema';
import { Post } from 'src/modules/post/schema/post.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  bio?: string;

  @Prop({ required: false, name: 'profile_picture' })
  profilePicture?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Like' }] })
  likes: Like[];
}

export const UserSchema = SchemaFactory.createForClass(User);
