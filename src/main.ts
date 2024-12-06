import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { wintonLogger } from './utils/logger/winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: wintonLogger,
  });

  const options = new DocumentBuilder()
    .setTitle('Bechinza-API')
    .setDescription('Bechinza-API docs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe()); // Pipe역할 요청 내 DTO 타입 감지

  await app.listen(3000);
}
bootstrap();
