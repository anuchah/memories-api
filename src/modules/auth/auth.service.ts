import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { verifyPassword } from 'src/core/utils/passwordHasher';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(signInDto.username);

    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const validPassword = await verifyPassword(
      signInDto.password,
      user.password,
    );

    if (!validPassword) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: user._id, username: user.username };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
