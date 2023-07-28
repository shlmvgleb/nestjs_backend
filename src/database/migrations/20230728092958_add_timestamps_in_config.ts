import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';

export async function up(knex: Knex) {
  await knex.schema.alterTable(TableNames.configuration, table => {
    table
	  .timestamps(true, true);
  });

  return knex;
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(TableNames.configuration, table => {
    table.dropTimestamps();
  });
}
