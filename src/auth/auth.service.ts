import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly http: HttpService,
  ) {}

  sign(user: any) {
    const payload = {
      sub: `${user.provider}:${user.providerId}`,
      nickname: user.nickname,
      email: user.email,
    };
    return this.jwt.sign(payload, { expiresIn: '7d' });
  }

   async handleKakaoCallback(code: string): Promise<{
    appToken: string;
    email: string | null;
    kakaoId: string;
    providerUser: any;
  }> {
    const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID!;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI; // callback에 사용한 redirect_uri와 반드시 동일
    const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET; // 사용 중이면

    // 1) 인가코드 -> 카카오 access_token 교환
    let tokenRes: any;
    try {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URI,
        code,
        ...(KAKAO_CLIENT_SECRET ? { client_secret: KAKAO_CLIENT_SECRET } : {}),
      });

      tokenRes = await firstValueFrom(
        this.http.post('https://kauth.kakao.com/oauth/token', body.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );
    } catch (e: any) {
      throw new UnauthorizedException({
        message: 'Failed to exchange code for kakao token',
        detail: e?.response?.data ?? e?.message,
      });
    }

    const kakaoAccessToken: string | undefined = tokenRes?.data?.access_token;
    if (!kakaoAccessToken) {
      throw new UnauthorizedException({ message: 'Kakao access_token missing' });
    }

    // 2) access_token -> 카카오 유저 정보 조회
    let meRes: any;
    try {
      meRes = await firstValueFrom(
        this.http.get('https://kapi.kakao.com/v2/user/me', {
          headers: { Authorization: `Bearer ${kakaoAccessToken}` },
        }),
      );
    } catch (e: any) {
      throw new UnauthorizedException({
        message: 'Failed to fetch kakao user info',
        detail: e?.response?.data ?? e?.message,
      });
    }

    const providerUser = meRes.data;
    const kakaoId = String(providerUser?.id ?? '');

    // kakao_account에서 파싱
    const acc = providerUser?.kakao_account ?? {};
    const email = acc?.email ?? null;

    // 3) 우리 서비스 토큰 발급 (너의 기존 로직 사용)
    // 여기서는 providerUser 기반으로 필요한 형태로 payload 구성해서 sign
    const appToken = this.sign({
      provider: 'kakao',
      providerUserId: kakaoId,
      email,
    });

    return { appToken, email, kakaoId, providerUser };
  }

  async upsertKakaoUser(input: { provider: 'kakao'; email: string; id: string; raw?: any }) {
    // 예: return this.userService.register({ provider: 'kakao', email: input.email, id: input.id })
    return;
  }
}
