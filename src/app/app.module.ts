import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import {
  GoogleSpreadsheetService,
  UserSpreadsheetService,
  TalkSpreadsheetService,
  EventSpreadsheetService,
} from 'integration';
import { EventService } from 'event/event.service';
import { EventController } from 'event/event.controller';
import { UserService } from 'user/user.service';
import { UserController } from 'user/user.controller';
import { TalkService } from 'talk/talk.service';
import { TalkController } from 'talk/talk.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      useFactory: () => [
        {
          rootPath: '/dist',
          serveRoot: '/static',
          serveStaticOptions: {
            index: false,
            fallthrough: false,
          },
        },
      ],
    }),
  ],
  controllers: [AppController, UserController, TalkController, EventController],
  providers: [
    AppService,
    UserSpreadsheetService,
    GoogleSpreadsheetService,
    TalkSpreadsheetService,
    EventSpreadsheetService,
    UserService,
    TalkService,
    EventService,
  ],
})
export class AppModule {}
