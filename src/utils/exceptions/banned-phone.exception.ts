import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';
import { formatString } from '../helpers/format-string';

export class BannedPhoneException extends HttpException {
  constructor(phone: string) {
    super(
      formatString(ErrorMessagesEnum.bannedPhone, phone),
      HttpStatus.FORBIDDEN,
    );
  }
}
