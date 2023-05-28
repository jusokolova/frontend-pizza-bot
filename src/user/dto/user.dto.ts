import { IsDefined, IsNumber, IsString, IsBase64 } from 'class-validator';

import { USER } from '../../constants';
import type { RoleType } from 'types';

export class UserIDDto {
  @IsDefined()
  @IsNumber()
  id: number;
}

export class UserDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  telegram?: string;

  role?: RoleType = USER;

  @IsBase64()
  avatar?: string;
}
