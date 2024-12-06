import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: { nickname: string; email: string }) {
    const payload = { email: user.email, nickname: user.nickname };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
