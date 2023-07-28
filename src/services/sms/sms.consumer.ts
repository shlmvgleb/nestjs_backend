import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { QueuesEnum } from '../../utils/enums/queues.enum';
import { Job } from 'bull';
import { SmsJobPayload } from './types/sms.job.payload';
import { formatString } from '../../utils/helpers/format-string';
import { SmsApiService } from './sms-api/sms.api.service';
import { RedisService } from '../../redis/redis.service';
import { ConfigurationService } from '../config/configuration.service';
import { HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const smsMessage = 'Подтверждение номера телефона. Ваш код: ??';
const phoneConfirmationCondition = 10;

@Processor(QueuesEnum.SMS)
export class SmsConsumer {
  constructor(
    private smsApiService: SmsApiService,
    private redisService: RedisService,
    private customConfigService: ConfigurationService,
    private configService: ConfigService,
  ) {}

  private readonly logger = new Logger(SmsConsumer.name);

  private readonly config = this.configService.get('env');


  @Process('sendMessage')
  async sendMessage(job: Job<SmsJobPayload>) {
    const response = await this.smsApiService.sendMessage(job.data.phone, formatString(smsMessage, job.data.code));
    const balance = +response.balance;
    const env = this.config.environments;

    if (balance < phoneConfirmationCondition && env === 'production') {
      const configEntity = await this.customConfigService.findOneByKeyOrThrow('PHONE_NUMBER_CONFIRMATION');
      await this.customConfigService.update({
        id: configEntity.id,
        value: 'false',
      });
    }

    await this.redisService.set('balance', response.balance);

    return {
      balance: balance,
      status: HttpStatus.OK,
    };
  }


  @OnQueueActive()
  async onQueueActive(job: Job) {
    this.logger.log(`Job with id - ${job.id} is active now.`);
  }
}
