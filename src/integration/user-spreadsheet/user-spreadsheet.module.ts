import { Module } from '@nestjs/common';

import { UserExistsInterceptor } from 'user/interceptors/user-exists.interceptor';
import { GoogleSpreadsheetService } from '../google-spreadsheet.service';
import { UserSpreadsheetService } from './user-spreadsheet.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UserSpreadsheetService,
    GoogleSpreadsheetService,
    UserExistsInterceptor,
  ],
})
export class UserSpreadsheetModule {}
