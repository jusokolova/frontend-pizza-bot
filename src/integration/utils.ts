import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { UserDto, UserIDDto } from 'user/dto/user.dto';
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

export const editRow = (row, data) => {
  Object.entries(data).forEach(([key, value]) => {
    row[key] = value;
  });
};
