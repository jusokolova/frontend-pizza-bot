import { Injectable, UseInterceptors } from '@nestjs/common';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { GoogleSpreadsheetService } from 'integration/google-spreadsheet.service';
import { editRow, mapUsersRow } from 'integration/utils';
import { UserDto, UserIDDto } from 'user/dto/user.dto';
import { UserExistsInterceptor } from 'user/interceptors/user-exists.interceptor';

@Injectable()
export class UserSpreadsheetService {
  spreadsheet;
  rows;

  constructor(private googleSpreadsheets: GoogleSpreadsheetService) {}

  private async initialize() {
    this.spreadsheet = await this.googleSpreadsheets.getUserSpreadsheet();
    this.rows = await this.spreadsheet.getRows();
  }

  async getSpreadsheet() {
    await this.initialize();
    return this.spreadsheet;
  }

  async getRows() {
    await this.initialize();
    return this.rows.map(mapUsersRow);
  }

  async getLastUserId(): Promise<number> {
    await this.initialize();
    const rows = await this.getRows();

    return Number(rows[rows.length - 1]?.id) || 0;
  }

  async getUser(
    { id }: UserIDDto,
    { name }: UserDto,
  ): Promise<GoogleSpreadsheetRow | string> {
    await this.initialize();
    const rows = await this.getRows();

    return rows.find((user) => user.id === id || user.name === name);
  }

  async addUser(data: UserDto & UserIDDto): Promise<void | string> {
    await this.initialize();
    const spreadsheet = await this.getSpreadsheet();

    try {
      await spreadsheet.addRow(data);
    } catch (e) {
      throw new Error('error');
    }
  }

  async editUser({ id }: UserIDDto, data: UserDto): Promise<void | string> {
    await this.initialize();
    const row = this.rows[id - 1];
    editRow(row, data);
    await row.save();
  }
}
