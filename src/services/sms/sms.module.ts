import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { SmsApiService } from './sms-api/sms.api.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SmsConfig } from './config/sms.conf';
import { RedisModule } from '../../redis/redis.module';
import { ConfigurationModule } from '../config/config.module';
import { BullModule } from '@nestjs/bull';
import { QueuesEnum } from '../../utils/enums/queues.enum';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { SmsConsumer } from './sms.consumer';

@Module({
  providers: [
    SmsService,
    SmsApiService,
    SmsConsumer,
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
    BullModule.registerQueue({
      name: QueuesEnum.SMS,
    }),
    BullBoardModule.forFeature({
      name: QueuesEnum.SMS,
      adapter: BullAdapter,
    }),
    RedisModule,
    ConfigurationModule,
  ],
  controllers: [SmsController],
  exports: [SmsService],
})
export class SmsModule {}
