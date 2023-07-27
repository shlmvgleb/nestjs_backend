import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class OrdersNotFoundException extends HttpException {
  constructor() {
    super(ErrorMessagesEnum.ordersNotFound, HttpStatus.NOT_FOUND);
  }
}