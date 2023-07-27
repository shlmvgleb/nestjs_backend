import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class WrongUuidOfConfirmReqException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.invalidReqUuid,
      HttpStatus.BAD_REQUEST,
    );
  }
}
