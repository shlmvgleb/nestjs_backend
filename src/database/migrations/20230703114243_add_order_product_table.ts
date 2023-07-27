import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';

export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.orderProduct, table => {

    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .uuid('order_id');

    table
      .integer('count')
      .notNullable();

    table
      .string('product_name');

    table
      .string('category_name');

    table
      .string('brand_name');

    table
      .decimal('price');

    table
      .foreign('order_id')
      .references('id')
      .inTable(TableNames.order);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.orderProduct);
}

