import { Injectable } from '@nestjs/common';
import { UserDto, UserIDDto } from 'user/dto/user.dto';

@Injectable()
export class UserService {
  addUser(data: UserDto): string {
    console.log(data);
    return 'Added new User';
  }

  editUser(id: UserIDDto, data: UserDto): string {
    console.log(data);
    return `Edited user: ${data.name}`;
  }
}
