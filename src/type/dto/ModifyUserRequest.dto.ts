import { IsString } from 'class-validator';

export class ModifyUserRequestDto {
  @IsString()
  password?: string;

  @IsString()
  nickname?: string;
}
