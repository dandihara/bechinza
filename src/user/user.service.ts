import { Injectable } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRepositoryService } from 'src/database/service/user.repository.service';
import { RegisterUserDto } from 'src/type/dto/RegisterUserDto';

@Injectable()
export class UserService {
  constructor(private userRepositoryService: UserRepositoryService) {}

  async findUser(email: string) {
    const user = this.userRepositoryService.findByEmail(email);

    return user;
  }

  async register(registerInfo: RegisterUserDto) {
    const hashedPassword = await JwtStrategy.hashPassword(
      registerInfo.password,
    );
    await this.userRepositoryService.add({
      email: registerInfo.email,
      password: hashedPassword,
      nickname: registerInfo.nickname,
    });
    return {
      email: registerInfo.email,
      password: hashedPassword,
      nickname: registerInfo.nickname,
    };
  }
}
