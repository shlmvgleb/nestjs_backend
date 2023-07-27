import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';

export class RedisClientErrorException extends HttpException {
  constructor() {
    super(ErrorMessagesEnum.redisClientError, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
