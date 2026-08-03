import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { QUEUES } from './queues.constants';

/**
 * BullMQ root configuration. Feature modules register their own
 * processors; queues are declared here so any module can inject them
 * with @InjectQueue(QUEUES.<NAME>).
 */
@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>('redis.host'),
          port: configService.getOrThrow<number>('redis.port'),
          password: configService.get<string>('redis.password'),
        },
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: 'exponential', delay: 1000 },
          removeOnComplete: 1000,
          removeOnFail: 5000,
        },
      }),
    }),
    ...Object.values(QUEUES).map((name) => BullModule.registerQueue({ name })),
  ],
  exports: [BullModule],
})
export class QueuesModule {}
