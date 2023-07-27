import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';
import { formatString } from '../helpers/format-string';

export class OrderByPhoneNotFoundException extends HttpException {
  constructor(phone:string) {
    super(
      formatString(ErrorMessagesEnum.orderByPhoneNotFound, phone),
      HttpStatus.BAD_REQUEST,
    );
  }
}
