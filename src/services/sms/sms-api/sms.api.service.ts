import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsConfig } from '../config/sms.conf';
import axios from 'axios';
import { IBaseSmsApiParams, ISmsApiMessageParams } from './smsc-types/smsc.param';
import { SmsApiErrorException } from '../../../utils/exceptions/sms.api.error.exception';
import { GetBalanceFailedException } from '../../../utils/exceptions/get-balance-failed.exception';
import { SmsSendFailedException } from '../../../utils/exceptions/sms-send-failed.exceptiom';

const messageURL = 'https://smsc.ru/sys/send.php';
const balanceURL = 'https://smsc.ru/sys/balance.php';

@Injectable()
export class SmsApiService {
  constructor(private config: ConfigService) {}

  private readonly logger = new Logger(SmsApiService.name);

  private readonly smsConfig = this.config.get<SmsConfig>('sms');

  async sendMessage(phone: string, mess: string) {
    const parametersObject: ISmsApiMessageParams = {
      login: this.smsConfig.login,
      psw: this.smsConfig.password,
      phones: phone,
      mes: mess,
      fmt: 3, // for json response
    };

    let apiResponse;
    try {
      apiResponse = await axios.post(messageURL, {}, {
        params: parametersObject,
      });
    } catch (err) {
      this.logger.error(err.message);
      throw new SmsApiErrorException();
    }

    if (apiResponse.data.error) {
      this.logger.error('>>> error code: ', apiResponse.data.error_code);
      this.logger.error('>>> error msg: ', apiResponse.data.error);
      throw new SmsSendFailedException();
    }

    this.logger.log(apiResponse.data);

    const balance = await this.getBalance();

    return {
      data: apiResponse.data,
      balance: balance,
    };
  }

  async getBalance(): Promise<string> {
    const parametersObject: IBaseSmsApiParams = {
      login: this.smsConfig.login,
      psw: this.smsConfig.password,
      fmt: 3, // for json response
    };

    let apiResponse;
    try {
      apiResponse = await axios.post(balanceURL, {}, {
        params: parametersObject,
      });
    } catch (err) {
      this.logger.error(err.message);
      throw new SmsApiErrorException();
    }

    if (apiResponse.data.error) {
      this.logger.error('>>> error code: ', apiResponse.data.error_code);
      this.logger.error('>>> error msg: ', apiResponse.data.error);
      throw new GetBalanceFailedException();
    }

    return apiResponse.data.balance;
  }
}
