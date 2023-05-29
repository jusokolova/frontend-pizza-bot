import { GoogleSpreadsheetRow } from 'google-spreadsheet';

import type { IdType } from 'types';
import { UserDto } from 'user/dto/user.dto';
import { TalkDto } from 'talk/dto/talk.dto';
import { USER } from '../constants';

export const mapNewUser = (data) => ({
  ...data,
  role: data.role || USER,
});

export const mapUsersRow = (
  row: GoogleSpreadsheetRow,
): UserDto & { id: IdType } => ({
  id: row.id,
  name: row.name,
  telegram: row.telegram,
  avatar: row.avatar,
  role: row.role,
});

export const mapTalksRow = (
  row: GoogleSpreadsheetRow,
): TalkDto & { id: IdType } => ({
  id: row.id,
  date: row.date,
  title: row.title,
  description: row.desctiption,
  authorId: row.authorId,
});

export const mapEventsRow = (row: GoogleSpreadsheetRow) => ({
  id: row.id,
  date: row.date,
  isStarted: row.isStarted,
  isFinished: row.isFinished,
  eventUrl: row.eventUrl,
  recordUrl: row.recordUrl,
  freeSlots: row.freeSlots,
  userIds: row.userIds,
  talkIds: row.talkIds,
});

export const editRow = (row, data) => {
  Object.entries(data).forEach(([key, value]) => {
    row[key] = value;
  });
};
