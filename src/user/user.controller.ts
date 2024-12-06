import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/type/dto/CreateUserDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':email')
  async getUser(@Param('email') email: string) {
    return this.userService.findUser(email);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.userService.register(body);
    return user;
  }
}
