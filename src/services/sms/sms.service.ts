import { Injectable, Logger } from '@nestjs/common';
import { SmsApiService } from './sms-api/sms.api.service';
import { RedisService } from '../../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as generateUUIDV4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { SmsConfig } from './config/sms.conf';
import { InvalidSmsTokenException } from '../../utils/exceptions/invalid.sms.token.exception';
import { ISmsPayload } from './types/sms.payload';
import { ISmsData } from './types/sms.data';
import { BalanceData } from './types/balance.data';
import { ConfigurationService } from '../config/configuration.service';
import { QueuesEnum } from '../../utils/enums/queues.enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SmsJobPayload } from './types/sms.job.payload';

@Injectable()
export class SmsService {
  constructor(
    private smsApiService: SmsApiService,
    private redisService: RedisService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private customConfigService: ConfigurationService,
    @InjectQueue(QueuesEnum.SMS) private smsQueue: Queue,
  ) {}

  private config = this.configService.get<SmsConfig>('sms');

  private readonly logger = new Logger(SmsService.name);

  generateCode() {
    return Math.floor(Math.random() * (999999 - 111111) + 111111);
  }

  async sendCodeOnPhoneNumber(phone: string): Promise<ISmsData> {
    const code = this.generateCode();
    const smsJobPayload: SmsJobPayload = {
      phone: phone,
      code: code,
    };
    const uuid = generateUUIDV4();

    await this.smsQueue.add('sendMessage', smsJobPayload);

    const payload: ISmsPayload = {
      id: uuid,
    };

    let token = await this.jwtService.signAsync(payload, {
      expiresIn: this.config.tokenExp,
      secret: this.config.secret,
    });

    return {
      token: token,
      code: code,
      uuid: uuid,
    };
  }

  async validateSmsToken(token: string): Promise<ISmsPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.config.secret,
      });
    } catch (err) {
      this.logger.log(err.message);
      throw new InvalidSmsTokenException();
    }
  }

  async getBalance(): Promise<BalanceData> {
    const balance = await this.redisService.get('balance');

    if (!balance) {
      const balance = await this.smsApiService.getBalance();
      return {
        balance: balance,
      };
    }

    return {
      balance: balance,
    };
  }
}
