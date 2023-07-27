import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class FileRemoveFailedException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.fileRemoveFailed,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
