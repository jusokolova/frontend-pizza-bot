import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GoogleSpreadsheetService, UserSpreadsheetService } from 'integration';
import { UserService } from 'user/user.service';
import { UserController } from 'user/user.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
