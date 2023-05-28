import { IsOptional, IsString, IsBase64, IsDefined } from 'class-validator';

import type { RoleType } from 'types';

export class UserIDDto {
  @IsDefined()
  @IsString()
  id: string;
}

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
