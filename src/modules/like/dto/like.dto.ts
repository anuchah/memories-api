import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LikeDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  postId: string;
}
