import { Injectable } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRepositoryService } from 'src/database/service/user.repository.service';
import { CreateUserRequestDto } from 'src/type/dto/CreateUserRequest.dto';

@Injectable()
export class UserService {
  constructor(private userRepositoryService: UserRepositoryService) {}

  async findUser(email: string) {
    const user = this.userRepositoryService.findByEmail(email);

    return user;
  }

  async register(createUserRequestDto: CreateUserRequestDto) {
    const hashedPassword = await JwtStrategy.hashPassword(
      createUserRequestDto.password,
    );
    await this.userRepositoryService.add({
      email: createUserRequestDto.email,
      password: hashedPassword,
      nickname: createUserRequestDto.nickname,
    });
    return {
      email: createUserRequestDto.email,
      password: hashedPassword,
      nickname: createUserRequestDto.nickname,
    };
  }
}
