import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { ValueTypeEnum } from '../../../utils/enums/value.type.enum';

export class CreateConfigurationDto {
  @ApiProperty()
  @IsString({ message: ValidationEnum.NotString })
  key: string;

  @ApiProperty()
  @IsString({ message: ValidationEnum.NotString })
  value: string;

  @ApiProperty({ description: 'Type of value', enum: ValueTypeEnum })
  @IsEnum(ValueTypeEnum, { message: ValidationEnum.NotValueType })
  valueType: string;

  @ApiProperty()
  @IsString({ message: ValidationEnum.NotString })
  description: string;
}
