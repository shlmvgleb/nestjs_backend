import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';

export async function up(knex: Knex) {
  return knex.schema.alterTable(TableNames.brand, table => {
    table
      .uuid('file_id')
      .nullable();

    table
      .foreign('file_id')
      .references('id')
      .inTable(TableNames.file);
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(TableNames.brand, table => {
    table.dropForeign('file_id');
    table.dropColumn('file_id');
  });
}
