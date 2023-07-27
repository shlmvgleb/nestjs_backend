import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { RedisConfig } from './config/redis.config';
import { SetOptions } from './redis-types/set.td';
import { RedisClientErrorException } from '../utils/exceptions/redis-client-error.exception';

@Injectable()
export class RedisService implements OnModuleInit {

  constructor(private config: ConfigService) {}

  private readonly logger = new Logger(RedisService.name);

  private client: RedisClientType;

  redisConfig = this.config.get<RedisConfig>('redis');

  async onModuleInit() {
    this.client = createClient({
      socket: {
        host: this.redisConfig.host,
        port: this.redisConfig.port,
      },
    });
    this.client.on('error', (err) => {
      this.logger.error(err.message);
      throw new RedisClientErrorException();
    });
    await this.client.connect();
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string, options?: SetOptions) {
    return this.client.set(key, value, options);
  }

  async delete(key: string) {
    return this.client.del(key);
  }

}
