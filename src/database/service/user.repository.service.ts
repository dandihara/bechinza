import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user';
import { Repository } from 'typeorm';
import { RegisterUserRequestDto } from 'src/type/dto/RegisterUserRequest.dto';

export class UserRepositoryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async add(registerUserRequestDto: RegisterUserRequestDto) {
    return this.userRepository.insert({
      email: registerUserRequestDto.email,
      password: registerUserRequestDto.password,
      nickname: registerUserRequestDto.nickname,
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
