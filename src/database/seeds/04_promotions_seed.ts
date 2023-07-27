import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';
import { PromoTypeEnum } from '../../utils/enums/promo-type.enum';
import { bigPremiumId } from './03_products_seed';
import { brandId } from './02_brands_seed';

export const promotionPiligrimId = '9af41307-32d5-4366-b422-12e6cccc76b3';

export async function seed(knex: Knex) {
  return knex(TableNames.promotion).insert([
    {
      id: promotionPiligrimId,
      condition: 'При заказе 4-х "Premium" 19 литров - помпа в подарок',
      promoType: PromoTypeEnum.countOfProduct,
      giftName: 'Помпа',
      productId: bigPremiumId,
      count: 4,
      brandId: brandId,
    },
  ]);
}
