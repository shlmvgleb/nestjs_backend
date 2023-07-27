import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class FileUploadFailedException extends HttpException {
  constructor() {
    super(ErrorMessagesEnum.fileUploadFailed, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
