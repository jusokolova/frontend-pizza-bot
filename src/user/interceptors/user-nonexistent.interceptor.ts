import {
  Injectable,
  ExecutionContext,
  HttpException,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserSpreadsheetService } from 'integration/user-spreadsheet/user-spreadsheet.service';

@Injectable()
export class UserNonexistentInterceptor implements NestInterceptor {
  constructor(private userSheet: UserSpreadsheetService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response>> {
    const rows = await this.userSheet.getRows();
    const { query, body } = context.switchToHttp().getRequest();

    if (
      !rows.find((user) => user.id === query?.id || user.name === body?.name)
    ) {
      throw new HttpException('Такого пользователя в таблице нет', 404);
    }

    return next.handle();
  }
}
