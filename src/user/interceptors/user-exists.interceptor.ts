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
export class UserExistsInterceptor implements NestInterceptor {
  constructor(private userSheet: UserSpreadsheetService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response>> {
    const rows = await this.userSheet.getRows();
    const { body } = context.switchToHttp().getRequest();

    if (body.name) {
      if (rows.find((user) => user.name === body.name)) {
        throw new HttpException(EXCEPTIONS.USER_ALREADY_EXISTS, 400);
      }
    }

    return next.handle();
  }
}
