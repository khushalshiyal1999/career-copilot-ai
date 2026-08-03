import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

/**
 * Cron / interval / timeout scheduling root.
 * Feature modules declare their own @Cron() providers.
 */
@Module({
  imports: [ScheduleModule.forRoot()],
})
export class SchedulerModule {}
