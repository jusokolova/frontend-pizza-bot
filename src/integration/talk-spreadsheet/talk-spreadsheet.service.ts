import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';

import { EXCEPTIONS } from 'exceptions';
import { TalkDto, TalkIDDto } from 'talk/dto/talk.dto';
import { GoogleSpreadsheetService } from '../google-spreadsheet.service';
import { editRow, mapTalksRow } from '../utils';

@Injectable()
export class TalkSpreadsheetService {
  spreadsheet;
  rows;

  constructor(private googleSpreadsheets: GoogleSpreadsheetService) {}

  private async initialize() {
    this.spreadsheet = await this.googleSpreadsheets.getTalkSpreadsheet();
    this.rows = await this.spreadsheet.getRows();
  }

  async getSpreadsheet() {
    await this.initialize();
    return this.spreadsheet;
  }

  async getRows() {
    await this.initialize();
    return this.rows.map(mapTalksRow);
  }

  async getLastTalkId(): Promise<number> {
    await this.initialize();
    const rows = await this.getRows();

    return Number(rows[rows.length - 1]?.id) || 0;
  }

  async getTalk(
    { id }: TalkIDDto,
    { title }: TalkDto,
  ): Promise<GoogleSpreadsheetRow | string> {
    await this.initialize();
    const rows = await this.getRows();

    return rows.find((talk) => talk.id === id || talk.title === title);
  }

  async addTalk(data: TalkDto & TalkIDDto): Promise<void | string> {
    await this.initialize();
    const spreadsheet = await this.getSpreadsheet();

    try {
      await spreadsheet.addRow(data);
    } catch (e) {
      throw new Error(EXCEPTIONS.ADD_ROW_FAIL);
    }
  }

  async editTalk({ id }: TalkIDDto, data: TalkDto): Promise<void | string> {
    await this.initialize();
    const row = this.rows[Number(id) - 1];
    editRow(row, data);
    await row.save();
  }
}
