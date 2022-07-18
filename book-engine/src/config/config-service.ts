import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export const ConfigHttpRedisModule = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get('REDIS_BASE_URL'),
    port: configService.get('REDIS_PORT', 5007),
    ttl: 30,
    max: 1000,
  }),
  inject: [ConfigService],
};
