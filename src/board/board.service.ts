import { Injectable } from '@nestjs/common';
import { BoardType } from 'src/database/enum/BoardType.enum';

@Injectable()
export class BoardService {
  async create(email: string, title: string, content: string) {
    return {};
  }

  async search(keyword: string, boardType: BoardType) {}

  async modify(title?: string, content?: string) {}
}
