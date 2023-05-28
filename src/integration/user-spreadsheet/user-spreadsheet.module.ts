import { Module } from '@nestjs/common';

import { UserSpreadsheetService } from './user-spreadsheet.service';
import { GoogleSpreadsheetService } from 'integration/google-spreadsheet.service';
import { UserExistsInterceptor } from 'user/interceptors/user-exists.interceptor';

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
