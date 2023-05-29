import { Injectable } from '@nestjs/common';

import type { IdType } from 'types';
import { EventSpreadsheetService } from 'integration';
import { EventDto } from 'event/dto/event.dto';

@Injectable()
export class EventService {
  constructor(private eventSheet: EventSpreadsheetService) {}

  async addEvent(
    data: EventDto,
  ): Promise<(EventDto & { id: IdType }) | string> {
    const newId = (await this.eventSheet.getLastEventId()) + 1;
    const newEvent = {
      ...data,
      id: newId,
    };
    await this.eventSheet.addEvent(newEvent);
    return newEvent;
  }

  async editEvent(id: IdType, data: EventDto): Promise<any> {
    return await this.eventSheet.editEvent(id, data);
  }

  async getEvent(id?: IdType, data?: EventDto): Promise<EventDto | string> {
    return await this.eventSheet.getEvent(id, data);
  }

  async getCurrentEvent(): Promise<EventDto | string> {
    return await this.eventSheet.getCurrentEvent();
  }

  async startEvent(id?: IdType): Promise<void> {
    return await this.eventSheet.startEvent(id);
  }

  async finishEvent(id?: IdType): Promise<void> {
    return await this.eventSheet.finishEvent(id);
  }
}
