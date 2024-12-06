import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { CreateBoardDto } from 'src/type/dto/CreateBoardDto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}
  @Post('/add')
  async create(@Body() createBoardDto: CreateBoardDtoardDto) {}
}
