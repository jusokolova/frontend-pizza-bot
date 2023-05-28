import { UserService } from '../user.service';
import { UserDto } from '../dto/user.dto';
import { ADMIN } from '../../constants';

const newUserDataMock: UserDto = {
  name: 'Соколова Юлия',
  telegram: '@jusokolova',
  role: ADMIN,
};

const editUserDataMock: UserDto = {
  name: 'Соколова Юля',
};

describe('UserController', () => {
  let userService: UserService;

  beforeEach(async () => {
    userService = new UserService();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('add user', async () => {
    const result = await userService.addUser(newUserDataMock);
    expect(result).toBe([{ ...newUserDataMock, id: 1 }]);
  });

  it('edit user', async () => {
    const result = await userService.editUser({ id: 1 }, editUserDataMock);
    console.log([{ ...newUserDataMock, ...editUserDataMock, id: 1 }]);
    expect(result).toBe([{ ...newUserDataMock, ...editUserDataMock, id: 1 }]);
  });
});
