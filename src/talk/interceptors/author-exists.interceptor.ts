import {
  Injectable,
  ExecutionContext,
  HttpException,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { EXCEPTIONS } from 'exceptions';
import { UserSpreadsheetService } from 'integration';

@Injectable()
export class AuthorExistsInterceptor implements NestInterceptor {
  constructor(private userSheet: UserSpreadsheetService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response>> {
    const rows = await this.userSheet.getRows();
    const { body } = context.switchToHttp().getRequest();

    if (body.authorId) {
      if (!rows.find((user) => user.id === body.authorId)) {
        throw new HttpException(EXCEPTIONS.AUTHOR_NOT_FOUND, 400);
      }
    }

    return next.handle();
  }
}
