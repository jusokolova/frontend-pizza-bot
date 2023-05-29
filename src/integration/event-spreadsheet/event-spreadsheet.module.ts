import { Module } from '@nestjs/common';

import { GoogleSpreadsheetService } from '../google-spreadsheet.service';
import { EventSpreadsheetService } from './event-spreadsheet.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EventSpreadsheetService, GoogleSpreadsheetService],
})
export class EventSpreadsheetModule {}
