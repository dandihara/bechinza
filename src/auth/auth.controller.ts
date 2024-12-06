import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginRequestDto } from 'src/type/dto/LoginRequestDto';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtStrategy: JwtStrategy,
  ) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    const user = await this.userService.findUser(body.email);
    if (!user) {
      throw new Error('이메일이 존재하지 않습니다');
    }

    const hashedPassword = await JwtStrategy.hashPassword(body.password);
    const isValidatePassword = await this.jwtStrategy.comparePassword(
      body.password,
      hashedPassword,
    );
    if (!isValidatePassword) {
      return new Error('비밀번호가 일치하지 않습니다');
    }

    return await this.authService.generateToken({
      email: user.email,
      nickname: user.nickname,
    });
  }
}
