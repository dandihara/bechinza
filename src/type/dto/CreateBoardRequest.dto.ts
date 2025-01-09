import { IsEnum, IsString } from 'class-validator';
import { BoardType } from 'src/database/enum/BoardType.enum';

export class CreatedBoardRequestDto {
  @IsEnum(Object.values(BoardType))
  type: BoardType;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
