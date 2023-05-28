import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { UserDto, UserIDDto } from 'user/dto/user.dto';
import { TalkDto, TalkIDDto } from 'talk/dto/talk.dto';
import { USER } from '../constants';

export const mapNewUser = (data) => ({
  ...data,
  role: data.role || USER,
});

export const mapUsersRow = (
  row: GoogleSpreadsheetRow,
): UserDto & UserIDDto => ({
  id: row.id,
  name: row.name,
  telegram: row.telegram,
  avatar: row.avatar,
  role: row.role,
});

export const mapTalksRow = (
  row: GoogleSpreadsheetRow,
): TalkDto & TalkIDDto => ({
  id: row.id,
  date: row.date,
  title: row.title,
  description: row.desctiption,
  authorId: row.authorId,
});

export const editRow = (row, data) => {
  Object.entries(data).forEach(([key, value]) => {
    row[key] = value;
  });
};
