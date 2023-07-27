import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class ProductsNotFoundException extends HttpException {
  constructor() {
    super(ErrorMessagesEnum.productsNotFound, HttpStatus.BAD_REQUEST);
  }
}
