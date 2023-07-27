import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';
import { PromoTypeEnum } from '../../utils/enums/promo-type.enum';


export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.promotion, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('condition', 1000)
      .notNullable();

    table
      .enum('promo_type', Object.values(PromoTypeEnum))
      .notNullable();

    table
      .string('gift_name');

    table
      .uuid('product_id')
      .notNullable();

    table
      .integer('count')
      .notNullable();

    table
      .uuid('file_id')
      .nullable();

    table
      .uuid('brand_id')
      .notNullable();

    table
      .datetime('deleted_at')
      .nullable();

    table
      .timestamps(true, true);

    table
      .foreign('product_id')
      .references('id')
      .inTable(TableNames.product);

    table
      .foreign('file_id')
      .references('id')
      .inTable(TableNames.file);

    table
      .foreign('brand_id')
      .references('id')
      .inTable(TableNames.brand);
  });

}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.promotion);
}
