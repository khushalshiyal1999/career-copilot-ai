import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AiModule } from './ai/ai.module';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { AutomationModule } from './automation/automation.module';
import { CompaniesModule } from './companies/companies.module';
import { configuration, validateEnv } from './config';
import { JobsModule } from './jobs/jobs.module';
import { LoggerModule } from './logs/logger.module';
import { HealthModule } from './modules/health/health.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { QueuesModule } from './queues/queues.module';
import { ResumesModule } from './resumes/resumes.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Infrastructure
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validate: validateEnv,
    }),
    LoggerModule,
    PrismaModule,
    QueuesModule,
    SchedulerModule,
    HealthModule,

    // Domain
    AuthModule,
    UsersModule,
    JobsModule,
    CompaniesModule,
    ApplicationsModule,
    ResumesModule,
    AutomationModule,
    AiModule,
    NotificationsModule,
  ],
})
export class AppModule {}
