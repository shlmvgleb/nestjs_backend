import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SmsSenderService {
  private readonly logger = new Logger(SmsSenderService.name);

  sendCodeByPhoneNumber(code: number, phone: string) {
    this.logger.log('message sent to ' + phone);
    this.logger.log('your code is ' + code);
  }
}