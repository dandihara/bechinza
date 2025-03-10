import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: { nickname: string; email: string }) {
    const payload = { email: user.email, nickname: user.nickname };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      this.logger.error('권한없는 토큰입니다');
      return null;
    }
  }
}
