import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class UpdateConfigException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.updateConfigError,
      HttpStatus.BAD_REQUEST,
    );
  }
}
