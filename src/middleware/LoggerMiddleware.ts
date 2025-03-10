import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');
    const datetime = new Date();
    res.on('finish', () => {
      // 응답이 끝났을 때, 처리되도록 하는 keyword
      const { statusCode } = res;
      this.logger.log(
        `${datetime} USER- ${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
