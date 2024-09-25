import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('upload')
  @UseInterceptors(FileInterceptor('profile'))
  uploadProfile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.userService.uploadProfile(req.user.sub, file);
  }
}
