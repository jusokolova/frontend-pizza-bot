import { isDateNowOrLess } from 'talk/utils';

import {
  Injectable,
  ExecutionContext,
  HttpException,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { EXCEPTIONS } from 'exceptions';

@Injectable()
export class DateInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response>> {
    const { body } = context.switchToHttp().getRequest();

    if (isDateNowOrLess(body.date)) {
      throw new HttpException(EXCEPTIONS.DATE_INVALID, 400);
    }

    return next.handle();
  }
}
