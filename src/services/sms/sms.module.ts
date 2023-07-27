import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { SmsApiService } from './sms-api/sms.api.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SmsConfig } from './config/sms.conf';
import { RedisModule } from '../../redis/redis.module';
import { ConfigurationModule } from '../config/config.module';

@Module({
  providers: [
    SmsService,
    SmsApiService,
  ],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<SmsConfig>('sms');
        return {
          secret: config.secret,
        };
      },
    }),
    RedisModule,
    ConfigurationModule,
  ],
  controllers: [SmsController],
  exports: [SmsService],
})
export class SmsModule {}
