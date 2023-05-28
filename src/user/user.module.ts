import { Module } from '@nestjs/common';

import { UserSpreadsheetService } from 'integration';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserExistsInterceptor } from './interceptors';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserSpreadsheetService, UserExistsInterceptor],
})
export class UserModule {}
