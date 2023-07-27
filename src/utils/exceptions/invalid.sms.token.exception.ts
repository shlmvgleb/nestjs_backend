import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class InvalidSmsTokenException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.invalidSmsToken,
      HttpStatus.BAD_REQUEST,
    );
  }
}
