import { HttpException, HttpStatus } from '@nestjs/common';
import { formatString } from '../helpers/format-string';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class CategoryHaveChildException extends HttpException {
  constructor(id: string) {
    super(
      formatString(ErrorMessagesEnum.categoryHaveChild, id),
      HttpStatus.BAD_REQUEST,
    );
  }
}
