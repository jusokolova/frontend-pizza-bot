import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';

import { SPREADSHEETS } from '../constants';

@Injectable()
export class GoogleSpreadsheetService {
  spreadsheet;

  constructor() {
    this.spreadsheet = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
  }

  private async initialize() {
    await this.spreadsheet.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await this.spreadsheet.loadInfo();
  }

  async getUserSpreadsheet() {
    await this.initialize();
    return this.spreadsheet.sheetsByTitle[SPREADSHEETS.USER];
  }

  async getEventSpreadsheet() {
    await this.initialize();
    return this.spreadsheet.sheetsByTitle[SPREADSHEETS.EVENT];
  }

  async getTalkSpreadsheet() {
    await this.initialize();
    return this.spreadsheet.sheetsByTitle[SPREADSHEETS.TALK];
  }

  async getCandidateSpreadsheet() {
    await this.initialize();
    return this.spreadsheet.sheetsByTitle[SPREADSHEETS.CANDIDATE];
  }
}
