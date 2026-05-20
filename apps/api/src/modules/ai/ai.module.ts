import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiJobsController } from './ai-jobs.controller';
import { AiService } from './ai.service';
import { AiProcessor } from './ai.processor';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('AI_API_URL'),
        timeout: parseInt(config.get<string>('AI_TIMEOUT_MS') || '30000'),
        headers: {
          Authorization: `Bearer ${config.get<string>('AI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'ai',
      defaultJobOptions: {
        // AI calls are expensive — do not auto-retry on failure (caller can re-dispatch)
        attempts: 1,
        removeOnComplete: { age: 3600 },
        removeOnFail: { age: 3600 },
      },
    }),
  ],
  controllers: [AiController, AiJobsController],
  providers: [AiService, AiProcessor],
})
export class AiModule {}
