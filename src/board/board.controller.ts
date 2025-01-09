import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatedBoardRequestDto } from 'src/type/dto/CreateBoardRequest.dto';
import { BoardService } from './board.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}
  @Post('/add')
  @UseGuards(AuthGuard)
  async create(@Body() createdBoardRequestDto: CreatedBoardRequestDto) {}
}
