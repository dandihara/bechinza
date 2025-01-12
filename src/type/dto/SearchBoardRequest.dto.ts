import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BoardType } from 'src/database/enum/BoardType.enum';
import { SearchType } from 'src/database/enum/SearchType.enum';

export class SearchBoardRequestDto {
  @ApiProperty({ type: String })
  @IsString()
  keyword: string;

  @ApiProperty({ enum: BoardType, enumName: 'BoardType' })
  @IsEnum(Object.values(BoardType))
  @IsOptional() // 비어서 올 경우 ALL 체크
  boardType?: BoardType;

  @ApiProperty({ enum: SearchType, enumName: 'SearchType' })
  @IsEnum(Object.values(SearchType))
  @IsOptional()
  searchType?: SearchType;
}
