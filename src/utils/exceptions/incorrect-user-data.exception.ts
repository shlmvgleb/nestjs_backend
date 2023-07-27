import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class IncorrectUserDataException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.incorrectUserData,
      HttpStatus.BAD_REQUEST,
    );
  }
}
