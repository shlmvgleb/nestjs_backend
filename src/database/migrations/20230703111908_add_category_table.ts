import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';


export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.category, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('name')
      .notNullable();

    table
      .string('description', 1000);

    table
      .uuid('parent_id')
      .nullable();

    table
      .foreign('parent_id')
      .references('id')
      .inTable(TableNames.category);

    table
      .datetime('deleted_at')
      .nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.category);
}
