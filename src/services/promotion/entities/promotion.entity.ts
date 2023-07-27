import { BaseDeletableModel } from '../../../database/base-deletable.model';
import { ApiProperty } from '@nestjs/swagger';
import { PromoTypeEnum } from '../../../utils/enums/promo-type.enum';

export class Promotion extends BaseDeletableModel {
  static get tableName() {
    return 'promotion';
  }

  @ApiProperty({ description: 'Условие акции' })
  condition: string;

  @ApiProperty({ description: 'Тип акции', enum: PromoTypeEnum })
  promoType: string;

  @ApiProperty({ description: 'Подарок акции' })
  giftName: string;

  @ApiProperty({ description: 'some uuid of product' })
  productId: string;

  @ApiProperty({ description: 'Нужное количество товаров для выполнения условия' })
  count: number;

  @ApiProperty({ description: 'some uuid of file', nullable: true })
  fileId: string;

  @ApiProperty({ description: 'Бренд, на котором акция действительна' })
  brandId: string;
}
