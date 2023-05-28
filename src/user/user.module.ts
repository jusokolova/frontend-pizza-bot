import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSpreadsheetService } from 'integration/user-spreadsheet/user-spreadsheet.service';
import { UserExistsInterceptor } from 'user/interceptors/user-exists.interceptor';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserSpreadsheetService, UserExistsInterceptor],
})
export class UserModule {}
