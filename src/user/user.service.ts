import { Injectable } from '@nestjs/common';
import { UserDto, UserIDDto } from 'user/dto/user.dto';
import { UserSpreadsheetService } from 'integration/user-spreadsheet/user-spreadsheet.service';
import { mapNewUser } from 'integration/utils';

@Injectable()
export class UserService {
  constructor(private userSheet: UserSpreadsheetService) {}

  async addUser(data: UserDto): Promise<(UserDto & UserIDDto) | string> {
    const newId = (await this.userSheet.getLastUserId()) + 1;
    const newUser = {
      ...mapNewUser(data),
      id: newId,
    };
    await this.userSheet.addUser(newUser);
    return newUser;
  }

  async editUser(id: UserIDDto, data: UserDto): Promise<any> {
    return await this.userSheet.editUser(id, data);
  }

  async getUser(id?: UserIDDto, data?: UserDto): Promise<UserDto | string> {
    return await this.userSheet.getUser(id, data);
  }
}
