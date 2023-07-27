import { HttpException, HttpStatus } from '@nestjs/common';
import { formatString } from '../helpers/format-string';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class ConfigByKeyNotFoundException extends HttpException {
  constructor(key: string) {
    super(
      formatString(ErrorMessagesEnum.configByKeyNotFound, key),
      HttpStatus.BAD_REQUEST,
    );
  }
}
