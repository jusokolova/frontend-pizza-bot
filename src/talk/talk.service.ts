import { Injectable } from '@nestjs/common';
import { TalkSpreadsheetService } from 'integration';
import { TalkDto, TalkIDDto } from './dto/talk.dto';

@Injectable()
export class TalkService {
  constructor(private talkSheet: TalkSpreadsheetService) {}

  async getTalk(id: TalkIDDto, data: TalkDto): Promise<TalkDto | string> {
    return await this.talkSheet.getTalk(id, data);
  }

  async addTalk(data: TalkDto): Promise<(TalkDto & TalkIDDto) | string> {
    const newId = (await this.talkSheet.getLastTalkId()) + 1;
    const newTalk = { ...data, id: String(newId) };
    await this.talkSheet.addTalk(newTalk);
    return newTalk;
  }

  async editTalk(id: TalkIDDto, data: TalkDto): Promise<any> {
    return await this.talkSheet.editTalk(id, data);
  }
}
