import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class UnauthorizedException extends HttpException {
  constructor() {
    super(
      ErrorMessagesEnum.unauthorized,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
