import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class UpdateFileDto {
  @ApiProperty({ description: 'uuid of file', required: true })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'replacement file',
  })
  @IsFile({ message: ValidationEnum.NotFile })
  file: MemoryStoredFile;
}
