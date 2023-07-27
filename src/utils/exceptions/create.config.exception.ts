import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class CreateConfigException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.createConfigError,
      HttpStatus.BAD_REQUEST,
    );
  }
}
