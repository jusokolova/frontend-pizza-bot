import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  GoogleSpreadsheetService,
  UserSpreadsheetService,
  TalkSpreadsheetService,
} from 'integration';
import { UserService } from 'user/user.service';
import { UserController } from 'user/user.controller';
import { TalkController } from 'talk/talk.controller';
import { TalkService } from 'talk/talk.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UserController, TalkController],
  providers: [
    AppService,
    UserSpreadsheetService,
    GoogleSpreadsheetService,
    TalkSpreadsheetService,
    UserService,
    TalkService,
  ],
})
export class AppModule {}
