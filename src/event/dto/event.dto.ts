import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class EventDto {
  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsBoolean()
  isStarted: boolean;

  @IsOptional()
  @IsBoolean()
  isFinished: boolean;

  @IsOptional()
  userIds: string[];

  @IsOptional()
  talksIds: string[];

  @IsOptional()
  @IsString()
  eventUrl: string;

  @IsOptional()
  @IsString()
  recordUrl: string;

  @IsOptional()
  @IsString()
  freeSlots: string;
}
