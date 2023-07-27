import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class OrderTrxFailedException extends HttpException {
  constructor() {
    super(ErrorMessagesEnum.orderTrxFailed, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}