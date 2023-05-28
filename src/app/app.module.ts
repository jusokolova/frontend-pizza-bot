import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GoogleSpreadsheetModule } from 'integration/google-spreadsheet.module';
import { UserService } from 'user/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, GoogleSpreadsheetModule, UserService],
})
export class AppModule {}
