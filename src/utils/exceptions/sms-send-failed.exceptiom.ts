import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class SmsSendFailedException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.smsSendFailed,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
