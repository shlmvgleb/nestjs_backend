import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class WrongSmsCodeException extends HttpException {
  constructor() {
    super(ErrorMessagesEnum.wrongSmsCode, HttpStatus.BAD_REQUEST);
  }
}