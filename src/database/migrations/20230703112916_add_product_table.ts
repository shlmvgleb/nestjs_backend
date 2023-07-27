import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';


export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.product, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('name')
      .notNullable();

    table
      .uuid('category_id')
      .notNullable();

    table
      .uuid('brand_id')
      .notNullable();

    table
      .string('description', 1000);

    table
      .foreign('category_id')
      .references('id')
      .inTable(TableNames.category);

    table
      .foreign('brand_id')
      .references('id')
      .inTable(TableNames.brand);

    table
      .datetime('deleted_at')
      .nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.product);
}
