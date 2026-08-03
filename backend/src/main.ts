import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { setupSwagger } from './config/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('app.port');
  const apiPrefix = configService.getOrThrow<string>('app.apiPrefix');

  // Logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Security & performance
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: configService.getOrThrow<string[]>('cors.origins'),
    credentials: true,
  });

  // Routing
  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Global request/response pipeline
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );

  // API documentation
  if (configService.getOrThrow<boolean>('swagger.enabled')) {
    setupSwagger(app, apiPrefix);
  }

  app.enableShutdownHooks();

  await app.listen(port);
}

void bootstrap();
