import {
  Injectable,
  ExecutionContext,
  HttpException,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { EXCEPTIONS } from 'exceptions';
import { TalkSpreadsheetService } from 'integration';

@Injectable()
export class TalkNonexistentInterceptor implements NestInterceptor {
  constructor(private talkSheet: TalkSpreadsheetService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response>> {
    const rows = await this.talkSheet.getRows();
    const { query } = context.switchToHttp().getRequest();

    if (query.id) {
      if (!rows.find((talk) => talk.id === query.id)) {
        throw new HttpException(EXCEPTIONS.TALK_NOT_FOUND, 400);
      }
    }

    return next.handle();
  }
}
