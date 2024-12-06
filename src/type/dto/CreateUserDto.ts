import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @Length(8)
  @IsDefined()
  password: string;

  @IsString()
  @IsOptional()
  nickname: string;
}
