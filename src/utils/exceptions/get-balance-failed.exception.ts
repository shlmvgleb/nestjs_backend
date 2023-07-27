import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class GetBalanceFailedException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.getBalanceFailed,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
