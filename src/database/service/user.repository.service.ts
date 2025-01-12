import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/User';
import { Repository } from 'typeorm';
import { CreateUserRequestDto } from 'src/type/dto/CreateUserRequest.dto';

export class UserRepositoryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async add(createUserRequestDto: CreateUserRequestDto) {
    return this.userRepository.insert({
      email: createUserRequestDto.email,
      password: createUserRequestDto.password,
      nickname: createUserRequestDto.nickname,
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
