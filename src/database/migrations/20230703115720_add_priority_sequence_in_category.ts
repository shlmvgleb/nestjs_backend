import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';


export async function up(knex: Knex) {
  return knex.schema.alterTable(TableNames.category, table => {
    table
      .increments('priority', {
        primaryKey: false,
      });
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(TableNames.category, table => {
    table
      .dropColumn('priority');
  });
}
