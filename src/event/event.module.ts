import { Module } from '@nestjs/common';

import { EventSpreadsheetService } from 'integration';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventService, EventSpreadsheetService],
})
export class EventModule {}
