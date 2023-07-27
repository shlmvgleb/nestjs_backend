import { ErrorMessagesEnum } from '../enums/error-messages.enum';
import { formatString } from '../helpers/format-string';

export class PostgresConnectionError extends Error {
  constructor(code: string) {
    super(formatString(ErrorMessagesEnum.postgresConnection, code));
  }
}
