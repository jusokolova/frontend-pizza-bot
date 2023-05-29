import { Injectable } from '@nestjs/common';
import { UserSpreadsheetService } from 'integration';
import { mapNewUser } from 'integration/utils';
import { UserDto, UserIDDto } from 'user/dto/user.dto';
import { EventDto, EventIDDto } from 'event/dto/event.dto';

@Injectable()
export class EventService {
  constructor(private userSheet: UserSpreadsheetService) {}

  async addEvent(data: EventDto): Promise<(EventDto & EventIDDto) | string> {
    const newId = (await this.userSheet.getLastUserId()) + 1;
    const newUser = {
      ...mapNewUser(data),
      id: newId,
    };
    await this.userSheet.addUser(newUser);
    return newUser;
  }

  async editEvent(id: EventIDDto, data: UserDto): Promise<any> {
    return await this.userSheet.editUser(id, data);
  }

  async getEvent(id?: EventIDDto, data?: UserDto): Promise<UserDto | string> {
    return await this.userSheet.getUser(id, data);
  }
}
