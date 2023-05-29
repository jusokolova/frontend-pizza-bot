import { readFileSync } from 'fs';
import { join } from 'path';
import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

const template = readFileSync(join(__dirname, '../../views/index.html'));

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('content-type', 'text/html; charset=utf-8')
  manual() {
    return template.toString();
  }
}
