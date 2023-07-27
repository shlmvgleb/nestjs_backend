import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class PricingQueryProperties {
  @ApiProperty({ description: 'Сортировка по uuid товара', required: false })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  productId?: string;
}
