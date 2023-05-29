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

import type { IdType } from 'types';
import { DateInterceptor } from 'shared/interceptors';
import { TalkDto } from './dto/talk.dto';
import { TalkService } from './talk.service';
import {
  AuthorExistsInterceptor,
  TalkAlreadyExistsInterceptor,
  TalkNonexistentInterceptor,
} from './interceptors';

@Controller('/api/talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Get('/')
  @UseInterceptors(TalkNonexistentInterceptor)
  async getUser(@Query('id') id: IdType, @Body() talk: TalkDto) {
    return this.talkService.getTalk(id, talk);
  }

  @Post('/add')
  @Header('Content-Type', 'application/json')
  // TODO: add 'no more free slots interceptor'
  @UseInterceptors(
    AuthorExistsInterceptor,
    TalkAlreadyExistsInterceptor,
    DateInterceptor,
  )
  async addUser(@Body() talk: TalkDto) {
    return this.talkService.addTalk(talk);
  }

  @Patch('/edit')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(
    AuthorExistsInterceptor,
    TalkNonexistentInterceptor,
    DateInterceptor,
  )
  async editUser(@Query('id') id: IdType, @Body() talk: TalkDto) {
    return this.talkService.editTalk(id, talk);
  }
}
