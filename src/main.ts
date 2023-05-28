import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from 'app/app.module';
import { GoogleSpreadsheetService } from 'integration/google-spreadsheet.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const spreadsheet = new GoogleSpreadsheetService();
  const result = await spreadsheet.initialize();
  await app.listen(app.get(ConfigService).get('PORT'));
}
bootstrap();
