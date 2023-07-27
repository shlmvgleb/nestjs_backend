import { Knex } from 'knex';
import { Product } from '../../services/product/entities/product.entity';
import { bigCategoryId, mediumCategoryId, smallCategoryId } from './01_categories_seed';
import { brandId } from './02_brands_seed';

export const bigPremiumId = 'd10996c5-9c4d-40cd-b846-defd6cbdff7d';

export async function seed(knex: Knex): Promise<any> {

  const productBig = await knex(Product.tableName).insert({
    id: bigPremiumId,
    name: 'Premium 19 Л',
    categoryId: bigCategoryId,
    brandId: brandId,
  }).returning('*');

  const productMedium = await knex(Product.tableName).insert({
    name: 'Normal 5 Л',
    categoryId: mediumCategoryId,
    brandId: brandId,
  }).returning('*');

  const productSmall = await knex(Product.tableName).insert({
    name: 'Sport 0.5 Л',
    categoryId: smallCategoryId,
    brandId: brandId,
  }).returning('*');


  await knex('pricing').insert([{
    productId: productBig[0].id,
    count_from: 1,
    count_to: 4,
    price: 250,
  },
  {
    productId: productBig[0].id,
    count_from: 5,
    count_to: 10,
    price: 230,
  },
  {
    productId: productBig[0].id,
    count_from: 11,
    count_to: 0,
    price: 210,
  },
  ]);

  await knex('pricing').insert([{
    productId: productMedium[0].id,
    countFrom: 1,
    countTo: 4,
    price: 125,
  },
  {
    productId: productMedium[0].id,
    countFrom: 5,
    countTo: 10,
    price: 115,
  },
  {
    productId: productMedium[0].id,
    countFrom: 11,
    countTo: 0,
    price: 100,
  },
  ]);

  await knex('pricing').insert([{
    productId: productSmall[0].id,
    countFrom: 1,
    countTo: 4,
    price: 50,
  },
  {
    productId: productSmall[0].id,
    countFrom: 5,
    countTo: 10,
    price: 45,
  },
  {
    productId: productSmall[0].id,
    countFrom: 11,
    countTo: 0,
    price: 40,
  },
  ]);

  return knex;
}
