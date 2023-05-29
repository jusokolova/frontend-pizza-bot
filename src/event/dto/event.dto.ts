import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

import type { IdType } from 'types';

export class EventDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsBoolean()
  isStarted?: 'TRUE' | 'FALSE' | boolean;

  @IsOptional()
  @IsBoolean()
  isFinished?: boolean;

  @IsOptional()
  userIds?: IdType[];

  @IsOptional()
  talkIds?: IdType[];

  @IsOptional()
  @IsString()
  eventUrl?: string;

  @IsOptional()
  @IsString()
  recordUrl?: string;

  @IsOptional()
  @IsString()
  freeSlots?: string;
}
