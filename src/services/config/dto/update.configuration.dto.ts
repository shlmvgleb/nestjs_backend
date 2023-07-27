import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateConfigurationDto } from './create.configuration';
import { IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class UpdateConfigurationDto extends PartialType(CreateConfigurationDto) {
  @ApiProperty({ description: 'Uuid of configuration' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;
}
