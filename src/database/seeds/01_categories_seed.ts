import { Knex } from 'knex';
import { Category } from '../../services/category/entities/category.entity';
import { TableNames } from '../../utils/helpers/table-names';

export const waterCategoryId = 'b52a0b0b-bb62-4985-881d-67c8d9fd7bd3';
export const bigCategoryId = 'f73ff751-549d-4d3c-9c55-6897fe602db9';
export const mediumCategoryId = 'a18ef11a-7ce5-46fe-ba35-eab0e9338ea7';
export const smallCategoryId = 'adb13e40-a918-4ee3-acbb-02213cf4dba6';

export async function seed(knex: Knex): Promise<any> {
  await knex(TableNames.promotion).del();
  await knex(TableNames.pricing).del();
  await knex(TableNames.product).del();
  await knex(TableNames.category).where('parentId', '!=', null).del().then(async () => {
    await knex(TableNames.category).del();
    return knex;
  });

  return knex(Category.tableName).insert([
    {
      id: waterCategoryId,
      name: 'Вода',
    },
    {
      id: bigCategoryId,
      name: 'Большой объём (19Л)',
      parent_id: waterCategoryId,
    },
    {
      id: mediumCategoryId,
      name: 'Средний объём (5Л, 1.5Л)',
      parent_id: waterCategoryId,
    },
    {
      id: smallCategoryId,
      name: 'Маленький объём (0.5Л, 0.3Л)',
      parent_id: waterCategoryId,
    },
  ]);
}
