import { HttpException, HttpStatus } from '@nestjs/common';
import { formatString } from '../helpers/format-string';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class UserAlreadyExistsException extends HttpException {
  constructor(login: string) {
    super(
      formatString(ErrorMessagesEnum.userAlreadyExists, login),
      HttpStatus.BAD_REQUEST,
    );
  }
}
