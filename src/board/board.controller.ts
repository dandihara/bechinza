import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateBoardRequestDto } from 'src/type/dto/CreateBoardRequest.dto';
import { BoardService } from './board.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SearchBoardRequestDto } from 'src/type/dto/SearchBoardRequest.dto';
import { ApiBody } from '@nestjs/swagger';
import { ModifyBoardRequestDto } from 'src/type/dto/ModifyBoardRequest.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}
  @Post('/')
  @ApiBody({ type: CreateBoardRequestDto })
  @UseGuards(AuthGuard)
  async create(@Body() createBoardRequestDto: CreateBoardRequestDto) {}

  @Post('/modify')
  @ApiBody({ type: ModifyBoardRequestDto })
  @UseGuards(AuthGuard)
  async modify(@Body() modifyBoardReqeustDto: ModifyBoardRequestDto) {}

  @Post('/search')
  async search(@Body() searchBoardRequestDto: SearchBoardRequestDto) {}
}
