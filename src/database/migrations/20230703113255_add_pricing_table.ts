import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';


export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.pricing, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .integer('count_from')
      .notNullable();

    table
      .integer('count_to')
      .notNullable();

    table
      .integer('price')
      .notNullable();

    table
      .uuid('product_id')
      .notNullable();

    table
      .foreign('product_id')
      .references('id')
      .inTable(TableNames.product);

    table
      .datetime('deleted_at')
      .nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.pricing);
}
