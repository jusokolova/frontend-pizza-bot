import {
  Controller,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
  Get,
} from '@nestjs/common';

import { UserDto, UserIDDto } from './dto/user.dto';
import { UserExistsGuard } from './guards/user-exists.guard';
import { UserService } from './user.service';

@Controller('/api/user')
@UseGuards(UserExistsGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query() id: UserIDDto) {
    return this.userService.getUser(id);
  }

  @Post('/add')
  async addUser(@Param() user: UserDto) {
    return this.userService.addUser(user);
  }

  @Patch('/edit')
  async editUser(@Query() id: UserIDDto, @Param() user: UserDto) {
    return this.userService.editUser(id, user);
  }
}
