import { Injectable } from '@nestjs/common';
import { UserDto, UserIDDto } from 'user/dto/user.dto';

const table = {
  users: [],
};

const getLastUser = () => table.users[table.users.length - 1]?.id || 0;
const findUser = ({ id }) => table.users.find((user) => user.id === id);
const editUser = ({ id }, data) => {
  const { id: userId, ...rest } = findUser(id);
  return { id: userId, ...rest, ...data };
};

@Injectable()
export class UserService {
  async addUser(data: UserDto): Promise<any> {
    console.log(data);
    table.users.push({ ...data, id: getLastUser() + 1 });
    return table.users;
  }

  async editUser(id: UserIDDto, data: UserDto): Promise<any> {
    console.log(data);
    editUser(id, data);
    return table.users;
  }

  async getUser(id: UserIDDto): Promise<UserDto> {
    return findUser(id);
  }
}
