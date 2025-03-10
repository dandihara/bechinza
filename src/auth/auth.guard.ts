import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authruzation = req.headers.authorization;

    if (!authruzation) {
      throw new BadRequestException();
    }

    return true;
  }
}
