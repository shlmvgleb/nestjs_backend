import { Knex } from 'knex';
import { Brand } from '../../services/brand/entities/brand.entity';

export const brandId = '01d7ad1f-ef2d-450f-a304-f525dea5e9a5';

export async function seed(knex: Knex): Promise<any> {
  return knex(Brand.tableName).del().then(async () => {
    return knex(Brand.tableName).insert([
      {
        id: brandId,
        name: 'Some water brand',
      },
    ]);
  });
}
