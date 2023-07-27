import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PromoTypeEnum } from '../../../utils/enums/promo-type.enum';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class PromoQueryProperties {
  @ApiProperty({ description: 'Тип акции', enum: PromoTypeEnum, required: false })
  @IsEnum(PromoTypeEnum, { message: ValidationEnum.NotPromoType })
  @IsOptional()
  promoType?: string;

  @ApiProperty({ description: 'Бренд акции', required: false })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  brandId?: string;
}
