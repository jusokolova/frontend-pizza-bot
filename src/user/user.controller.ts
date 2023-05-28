import {
  Controller,
  Body,
  Post,
  Patch,
  Query,
  UseInterceptors,
  Get,
  Header,
} from '@nestjs/common';

import { UserDto, UserIDDto } from './dto/user.dto';
import { UserService } from './user.service';
import {
  UserExistsInterceptor,
  UserNonexistentInterceptor,
} from './interceptors';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseInterceptors(UserNonexistentInterceptor)
  async getUser(@Query() id: UserIDDto, @Body() user: UserDto) {
    return this.userService.getUser(id, user);
  }

  @Post('/add')
  @UseInterceptors(UserExistsInterceptor)
  @Header('Content-Type', 'application/json')
  async addUser(@Body() user: UserDto) {
    return this.userService.addUser(user);
  }

  @Patch('/edit')
  @UseInterceptors(UserNonexistentInterceptor)
  @Header('Content-Type', 'application/json')
  async editUser(@Query() id: UserIDDto, @Body() user: UserDto) {
    return this.userService.editUser(id, user);
  }
}
