import { ApiProperty } from '@nestjs/swagger';
import { PromoTypeEnum } from '../../../utils/enums/promo-type.enum';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class CreatePromotionDto {
  @ApiProperty({ description: 'Условие акции' })
  @IsString({ message: ValidationEnum.NotString })
  condition: string;

  @ApiProperty({ description: 'Тип акции', enum: PromoTypeEnum })
  @IsEnum(PromoTypeEnum, { message: ValidationEnum.NotPromoType })
  promoType: string;

  @ApiProperty({ description: 'Подарок акции' })
  @IsString({ message: ValidationEnum.NotString })
  giftName: string;

  @ApiProperty({ description: 'some uuid of product', nullable: true })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  productId: string;

  @ApiProperty({ description: 'Нужное количество товаров для выполнения условия', nullable: true })
  @IsInt({ message: ValidationEnum.NotInt })
  count: number;

  @ApiProperty({ description: 'some uuid of file', nullable: true })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  fileId?: string;

  @ApiProperty({ description: 'Бренд акции' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  brandId: string;
}
