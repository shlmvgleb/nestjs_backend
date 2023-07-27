import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class SmsApiErrorException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.smsApiError,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
