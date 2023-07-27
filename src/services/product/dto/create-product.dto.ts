import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class CreateProductDto {
  @ApiProperty({ description: 'Название товара' })
  @IsString({ message: ValidationEnum.NotString })
  @IsNotEmpty({ message: ValidationEnum.NameNotEmpty })
  name: string;

  @ApiProperty({ description: 'Описание товара' })
  @IsString({ message: ValidationEnum.NotString })
  description: string;

  @ApiProperty({ description: 'Бренд товара' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  brandId: string;

  @ApiProperty({ description: 'Категория товара' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  categoryId: string;

  @ApiProperty({ description: 'Лого товара' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  fileId?: string;
}
