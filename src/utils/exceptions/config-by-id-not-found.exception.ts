import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';
import { formatString } from '../helpers/format-string';

export class ConfigByIdNotFoundException extends HttpException {
  constructor(id: string) {
    super(
      formatString(ErrorMessagesEnum.configByIdNotFound, id),
      HttpStatus.BAD_REQUEST,
    );
  }
}
