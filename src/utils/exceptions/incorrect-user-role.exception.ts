import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class IncorrectUserRoleException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.incorrectRole,
      HttpStatus.FORBIDDEN,
    );
  }
}
