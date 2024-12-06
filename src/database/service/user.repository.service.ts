import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/type/dto/RegisterUserDto';

export class UserRepositoryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async add(info: RegisterUserDto) {
    return this.userRepository.insert({
      email: info.email,
      password: info.password,
      nickname: info.nickname,
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
