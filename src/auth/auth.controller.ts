import { UserService } from 'src/user/user.service';
import { LoginRequestDto } from 'src/type/dto/LoginRequest.dto';
import { JwtStrategy } from './jwt.strategy';
import { CreateUserRequestDto, CreateKakaoUserDto } from 'src/type/dto/CreateUserRequest.dto';
import { Controller, Get, Req, Res, Query, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import type { Response, Request } from 'express';

// 카카오 로그인으로 고정 + 추후 소셜 로그인은 늘릴 예정
@Controller('api/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtStrategy: JwtStrategy,
  ) {}

  @Post('sign')
  async register(@Body() createUserRequestDto: CreateUserRequestDto) {
    // 소셜 로그인을 통하여 얻은 이메일이 계정
    const user = await this.userService.register(createUserRequestDto);
    return user;
  }

  @Get('kakao')
  async kakaoLogin(@Res() res:Response) {
    // 카카오 로그인 페이지로 리다이렉트 테스트용
    const params = new URLSearchParams({
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: 'http://localhost:3000/api/auth/kakao/callback',
      response_type: 'code',
    });

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;

    return res.redirect(kakaoAuthUrl)
  }

 @Get('kakao/callback')
  async kakaoCallback(
    @Query('code') code: string,
    @Query('error') error: string,
    @Query('error_description') errorDescription: string,
    @Res() res: Response,
  ) {
    if (error) {
      // 사용자가 취소했거나 에러 발생
      return res.status(400).send({
        error,
        errorDescription,
      });
    }

    if (!code) {
      return res.status(400).send({ message: 'Missing code' });
    }
       // code -> (카카오 토큰) -> (카카오 유저정보) -> 파싱
    const { appToken, email, kakaoId, providerUser } =
      await this.authService.handleKakaoCallback(code);

    if (!email) {
      // 카카오 계정에 이메일이 없거나(scope 미동의)
      // 원하는 정책대로 처리 (예: 프론트로 특정 에러코드 redirect)
      return res.status(400).send({ message: 'Email is missing (scope not granted)' });
    }

    // 회원가입/업서트
    await this.authService.upsertKakaoUser({
      provider: 'kakao',
      email,
      id: kakaoId,
      raw: providerUser,
    });

    // 너희 서비스 JWT 발급
    const token = appToken;

    // 프론트로 redirect
    const redirect = new URL(process.env.FRONTEND_REDIRECT_URI!);
    redirect.searchParams.set('token', token);
    return res.redirect(redirect.toString());
  }
}
