import { IsString } from 'class-validator';

export class ModifyUserDto {
  @IsString()
  password?: string;

  @IsString()
  nickname?: string;
}
