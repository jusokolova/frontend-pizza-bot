import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';

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
    return this.spreadsheet.sheetsByTitle['User'];
  }

  async getEventSpreadsheet() {
    await this.initialize();
    return this.spreadsheet.sheetsByTitle['Event'];
  }

  async getTalkSpreadsheet() {
    await this.initialize();
    return this.spreadsheet.sheetsByTitle['Talk'];
  }

  async getCandidateSpreadsheet() {
    await this.initialize();
    return this.spreadsheet.sheetsByTitle['Candidate'];
  }
}
