import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';

import type { IdType } from 'types';
import { EXCEPTIONS } from 'exceptions';
import { EventDto } from 'event/dto/event.dto';
import { GoogleSpreadsheetService } from '../google-spreadsheet.service';
import { editRow, mapEventsRow } from '../utils';

@Injectable()
export class EventSpreadsheetService {
  spreadsheet;
  rows;

  constructor(private googleSpreadsheets: GoogleSpreadsheetService) {}

  private async initialize() {
    this.spreadsheet = await this.googleSpreadsheets.getEventSpreadsheet();
    this.rows = await this.spreadsheet.getRows();
  }

  async getSpreadsheet() {
    await this.initialize();
    return this.spreadsheet;
  }

  async getRows() {
    await this.initialize();
    return this.rows.map(mapEventsRow);
  }

  async getLastEventId(): Promise<number> {
    await this.initialize();
    const rows = await this.getRows();

    return Number(rows[rows.length - 1]?.id) || 0;
  }

  async getEvent(
    id: IdType,
    { date }: EventDto,
  ): Promise<GoogleSpreadsheetRow | string> {
    await this.initialize();
    const rows = await this.getRows();

    return rows.find((event) => event.id === id || event.date === date);
  }

  async addEvent(data: EventDto & { id: IdType }): Promise<void | string> {
    await this.initialize();
    const spreadsheet = await this.getSpreadsheet();

    try {
      await spreadsheet.addRow(data);
    } catch (e) {
      throw new Error(EXCEPTIONS.ADD_ROW_FAIL);
    }
  }

  async editEvent(id: IdType, data: EventDto): Promise<void | string> {
    await this.initialize();
    const row = this.rows[Number(id) - 1];
    editRow(row, data);
    await row.save();
  }

  async getCurrentEvent() {
    await this.initialize();
    const rows = await this.getRows();
    return rows.find((event) => event.isStarted && !event.isFinished);
  }

  async startEvent(id: IdType) {
    await this.editEvent(id, { isStarted: true });
  }

  async finishEvent(id: IdType) {
    await this.editEvent(id, { isStarted: false, isFinished: true });
  }
}
