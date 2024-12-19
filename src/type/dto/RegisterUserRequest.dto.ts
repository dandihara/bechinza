import { IsEmail, IsString } from 'class-validator';

export class RegisterUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;
}
