import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { BoardType } from 'src/database/enum/BoardType.enum';

export class CreateBoardRequestDto {
  @ApiProperty({ enum: BoardType, enumName: 'BoardType' })
  @IsEnum(Object.values(BoardType))
  boardType: BoardType;

  @ApiProperty({ type: String })
  @IsString()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  content: string;
}
