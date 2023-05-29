import { Injectable } from '@nestjs/common';

import type { IdType } from 'types';
import { TalkSpreadsheetService } from 'integration';
import { TalkDto } from './dto/talk.dto';

@Injectable()
export class TalkService {
  constructor(private talkSheet: TalkSpreadsheetService) {}

  async getTalk(id: IdType, data: TalkDto): Promise<TalkDto | string> {
    return await this.talkSheet.getTalk(id, data);
  }

  async addTalk(data: TalkDto): Promise<(TalkDto & { id: IdType }) | string> {
    const newId = (await this.talkSheet.getLastTalkId()) + 1;
    const newTalk = { ...data, id: String(newId) };
    await this.talkSheet.addTalk(newTalk);
    return newTalk;
  }

  async editTalk(id: IdType, data: TalkDto): Promise<any> {
    return await this.talkSheet.editTalk(id, data);
  }
}
