import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseException extends HttpException {
  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  path: string;

  constructor(errorCode: string, statusCode: number) {
    super(errorCode, statusCode);
    {
      this.errorCode = errorCode;
      this.statusCode = statusCode;
    }
  }
}
