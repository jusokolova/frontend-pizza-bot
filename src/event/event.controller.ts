import {
  Controller,
  Body,
  Post,
  Patch,
  Query,
  Get,
  Header,
  UseInterceptors,
} from '@nestjs/common';

import { EventDto, EventIDDto } from './dto/event.dto';
import { EventService } from './event.service';
import { DateInterceptor } from 'shared/interceptors';

@Controller('/api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/current')
  async getCurrentEvent() {
    // return events.find((event) => event.isStarted && !event.isFinished)
  }

  @Get('/record')
  async getEventRecord(@Query() id: EventIDDto, @Body() data: EventDto) {
    // return events.find((event) => event.id === id || event.date === data.date)
  }

  @Get('/slots')
  async getFreeSlots(@Query() id: EventIDDto, @Body() data: EventDto) {
    // if event.slots > 0 return "Add self" button, else return "No more free slots"
  }

  @Post('/add')
  @Header('Content-Type', 'application/json')
  // TODO: add 'no more free slots interceptor'
  @UseInterceptors(DateInterceptor)
  async addEvent(@Body() event: EventDto) {
    return this.eventService.addEvent(event);
  }

  @Patch('/edit')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(DateInterceptor)
  async editUser(@Query() id: EventIDDto, @Body() event: EventDto) {
    return this.eventService.editEvent(id, event);
  }
}
