import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: [
      configService.get<string>('LOCAL_URL_2'),
      configService.get<string>('LOCAL_URL'),
    ],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
