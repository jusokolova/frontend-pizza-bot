import { Injectable } from '@nestjs/common';
import type { IdType } from 'types';
import { UserSpreadsheetService } from 'integration';
import { mapNewUser } from 'integration/utils';
import { UserDto } from 'user/dto/user.dto';
import { EventDto } from 'event/dto/event.dto';

@Injectable()
export class EventService {
  constructor(private userSheet: UserSpreadsheetService) {}

  async addEvent(
    data: EventDto,
  ): Promise<(EventDto & { id: IdType }) | string> {
    const newId = (await this.userSheet.getLastUserId()) + 1;
    const newUser = {
      ...mapNewUser(data),
      id: newId,
    };
    await this.userSheet.addUser(newUser);
    return newUser;
  }

  async editEvent(id: IdType, data: UserDto): Promise<any> {
    return await this.userSheet.editUser(id, data);
  }

  async getEvent(id?: IdType, data?: UserDto): Promise<UserDto | string> {
    return await this.userSheet.getUser(id, data);
  }
}
