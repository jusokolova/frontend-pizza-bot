import { Module } from '@nestjs/common';

import { TalkSpreadsheetService } from 'integration';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';

@Module({
  imports: [],
  controllers: [TalkController],
  providers: [TalkService, TalkSpreadsheetService],
})
export class TalkModule {}
