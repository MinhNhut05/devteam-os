import { DynamicModule, Global, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({})
export class RedisModule implements OnApplicationShutdown {
  private static client: Redis | null = null;

  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: REDIS_CLIENT,
          inject: [ConfigService],
          useFactory: (config: ConfigService): Redis | null => {
            const url = config.get<string>('REDIS_URL');
            const logger = new Logger('Redis');
            if (!url) {
              logger.warn('REDIS_URL not set — Socket.IO scaling and persistent cache disabled');
              return null;
            }
            // maxRetriesPerRequest: null and enableReadyCheck: false required by BullMQ (Phase 5)
            const client = new Redis(url, {
              maxRetriesPerRequest: null,
              enableReadyCheck: false,
            });
            client.on('connect', () => logger.log(`connected ${url}`));
            client.on('error', (err) => logger.error(err.message));
            RedisModule.client = client;
            return client;
          },
        },
      ],
      exports: [REDIS_CLIENT],
    };
  }

  async onApplicationShutdown(): Promise<void> {
    if (RedisModule.client) {
      await RedisModule.client.quit();
      RedisModule.client = null;
    }
  }
}
