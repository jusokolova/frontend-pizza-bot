import { Module } from '@nestjs/common';

import { GoogleSpreadsheetService } from '../google-spreadsheet.service';
import { UserSpreadsheetService } from './user-spreadsheet.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserSpreadsheetService, GoogleSpreadsheetService],
})
export class UserSpreadsheetModule {}
