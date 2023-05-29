import { IsOptional, IsString, IsBase64 } from 'class-validator';

import type { RoleType } from 'types';

export class UserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  role: RoleType;

  @IsOptional()
  @IsBase64()
  avatar: string;
}
