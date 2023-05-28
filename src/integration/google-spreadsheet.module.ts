import { Module } from '@nestjs/common';

import { GoogleSpreadsheetService } from './google-spreadsheet.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GoogleSpreadsheetService],
})
export class GoogleSpreadsheetModule {}
