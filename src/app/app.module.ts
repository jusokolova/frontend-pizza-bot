import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GoogleSpreadsheetModule } from 'integration/google-spreadsheet.module';
import { UserService } from 'user/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleSpreadsheetService } from 'integration/google-spreadsheet.service';
import { UserSpreadsheetService } from 'integration/user-spreadsheet/user-spreadsheet.service';
import { UserController } from 'user/user.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserSpreadsheetService,
    GoogleSpreadsheetService,
    UserService,
  ],
})
export class AppModule {}
