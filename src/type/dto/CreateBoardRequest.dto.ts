import { IsString } from 'class-validator';

export class CreatedBoardRequestDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
