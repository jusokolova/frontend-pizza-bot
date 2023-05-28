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
export class TalkAlreadyExistsInterceptor implements NestInterceptor {
  constructor(private talkSheet: TalkSpreadsheetService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response>> {
    const rows = await this.talkSheet.getRows();
    const { body } = context.switchToHttp().getRequest();

    if (rows.find((talk) => talk.title === body.title)) {
      throw new HttpException(EXCEPTIONS.TALK_ALREADY_EXISTS, 400);
    }

    return next.handle();
  }
}
