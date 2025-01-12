import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(8)
  @IsDefined()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  nickname: string;
}
