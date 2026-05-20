import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import type Redis from 'ioredis';
import { Logger as PinoNestLogger } from 'nestjs-pino';
import { join } from 'path';
import { AppModule } from './app.module';
import { initSentry } from './observability/sentry';
import { REDIS_CLIENT } from './redis/redis.module';
import { RedisIoAdapter } from './modules/notifications/redis-io.adapter';

async function bootstrap() {
  initSentry();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(PinoNestLogger);
  app.useLogger(logger);

  // Serve uploaded files (avatars, attachments) as static assets
  const uploadDir = process.env.UPLOAD_DIR || './uploads';
  app.useStaticAssets(join(process.cwd(), uploadDir), {
    prefix: '/uploads/',
  });

  // Parse cookies from incoming requests
  app.use(cookieParser());

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  // Socket.IO Redis adapter (only when REDIS_URL is configured)
  const redis = app.get<Redis | null>(REDIS_CLIENT, { strict: false });
  if (redis) {
    const ioAdapter = new RedisIoAdapter(app, redis);
    await ioAdapter.connectToRedis();
    app.useWebSocketAdapter(ioAdapter);
  }

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('DevTeamOS API')
    .setDescription('API documentation for DevTeamOS project management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`API running on http://localhost:${port}`, 'Bootstrap');
  logger.log(`Swagger docs at http://localhost:${port}/api/docs`, 'Bootstrap');
}

bootstrap();
