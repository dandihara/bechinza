import { Injectable } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRepositoryService } from 'src/database/service/user.repository.service';
import { RegisterUserRequestDto } from 'src/type/dto/RegisterUserRequest.dto';

@Injectable()
export class UserService {
  constructor(private userRepositoryService: UserRepositoryService) {}

  async findUser(email: string) {
    const user = this.userRepositoryService.findByEmail(email);

    return user;
  }

  async register(registerUserRequestDto: RegisterUserRequestDto) {
    const hashedPassword = await JwtStrategy.hashPassword(
      registerUserRequestDto.password,
    );
    await this.userRepositoryService.add({
      email: registerUserRequestDto.email,
      password: hashedPassword,
      nickname: registerUserRequestDto.nickname,
    });
    return {
      email: registerUserRequestDto.email,
      password: hashedPassword,
      nickname: registerUserRequestDto.nickname,
    };
  }
}
