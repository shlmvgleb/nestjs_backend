import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class FindProductsQueryProperties {
  @ApiProperty({ description: 'Сортировка по uuid бренда', required: false })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  brandId?: string;

  @ApiProperty({ description: 'Сортировка по uuid категории', required: false })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ description: 'Сортировка по uuid файла', required: false })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  fileId?: string;

  @ApiProperty({ description: 'Сортировка по названию', required: false })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Сортировка по описанию', required: false })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Порядок: (property_name-asc). Например: name-desc.', required: false })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  sort?: string;
}
