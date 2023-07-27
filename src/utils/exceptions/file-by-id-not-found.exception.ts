import { HttpException, HttpStatus } from '@nestjs/common';
import { formatString } from '../helpers/format-string';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class FileByIdNotFoundException extends HttpException {
  constructor(id: string) {
    super(
      formatString(ErrorMessagesEnum.fileByIdNotFound, id),
      HttpStatus.BAD_REQUEST,
    );
  }
}
