import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';
import { formatString } from '../helpers/format-string';
import { FilesService } from '../../services/files/files.service';

export class IncorrectFileExtException extends HttpException {
  constructor() {
    super(
      formatString(ErrorMessagesEnum.incorrectExt, FilesService.correctExts.join(', ')),
      HttpStatus.BAD_REQUEST,
    );
  }
}
