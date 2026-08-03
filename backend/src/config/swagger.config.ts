import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, apiPrefix: string): void {
  const config = new DocumentBuilder()
    .setTitle('Job AI API')
    .setDescription('AI-powered job application platform — API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addTag('health', 'Liveness & readiness probes')
    .addTag('auth', 'Authentication & authorization')
    .addTag('users', 'User management')
    .addTag('jobs', 'Job listings')
    .addTag('companies', 'Companies')
    .addTag('applications', 'Job applications')
    .addTag('resumes', 'Resume management')
    .addTag('automation', 'Application automation')
    .addTag('ai', 'AI features')
    .addTag('notifications', 'Notifications')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
