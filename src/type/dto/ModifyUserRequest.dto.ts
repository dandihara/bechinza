import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ModifyUserRequestDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  nickname?: string;
}
