import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class CategoryQueryProperties {

  @ApiProperty({
    description: 'Сортировка по приоритету(asc/desc)',
    required: false,
  })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  priorityDirection?: string;
}
