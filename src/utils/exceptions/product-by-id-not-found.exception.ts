import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';
import { formatString } from '../helpers/format-string';

export class ProductByIdNotFoundException extends HttpException {
  constructor(id: string) {
    super(
      formatString(ErrorMessagesEnum.productByIdNotFound, id),
      HttpStatus.BAD_REQUEST,
    );
  }
}
