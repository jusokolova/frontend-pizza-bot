import { IsString, IsDate, IsOptional, IsDateString } from 'class-validator';

export class TalkIDDto {
  @IsOptional()
  @IsString()
  id: string;
}

export class TalkDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  authorId: string;

  @IsOptional()
  @IsString()
  description: string;
}
