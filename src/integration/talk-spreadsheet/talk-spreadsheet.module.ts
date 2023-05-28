import { Module } from '@nestjs/common';

import { GoogleSpreadsheetService } from '../google-spreadsheet.service';
import { TalkSpreadsheetService } from './talk-spreadsheet.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TalkSpreadsheetService, GoogleSpreadsheetService],
})
export class TalkSpreadsheetModule {}
