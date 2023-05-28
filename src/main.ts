import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from 'app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(app.get(ConfigService).get('PORT'));
}
bootstrap();
