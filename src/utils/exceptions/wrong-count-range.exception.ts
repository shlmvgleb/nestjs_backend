import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class WrongCountRangeException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.wrongCountRange,
      HttpStatus.BAD_REQUEST,
    );
  }
}
