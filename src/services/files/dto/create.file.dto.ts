import { ApiProperty } from '@nestjs/swagger';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class CreateFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'new file',
  })
  @IsFile({ message: ValidationEnum.NotFile })
  file: MemoryStoredFile;
}
