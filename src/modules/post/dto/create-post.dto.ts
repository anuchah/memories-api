import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(2000)
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsNotEmpty()
  @IsOptional()
  user?: string;
}
