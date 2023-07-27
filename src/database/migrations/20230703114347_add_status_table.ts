import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';

export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.status, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('name')
      .notNullable();

    table
      .timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.status);
}
