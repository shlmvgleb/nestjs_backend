import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';


export async function up(knex: Knex) {
  await knex.schema.alterTable(TableNames.order, table => {
    table
      .uuid('status_id');

    table
      .foreign('status_id')
      .references('id')
      .inTable(TableNames.status);
  });

  return knex.schema.alterTable(TableNames.callbackReq, table => {
    table
      .uuid('status_id');

    table
      .foreign('status_id')
      .references('id')
      .inTable(TableNames.status);
  });
}

export async function down(knex: Knex) {
  await knex.schema.alterTable(TableNames.order, table => {
    table
      .dropForeign('status_id');

    table
      .dropColumn('status_id');
  });

  return knex.schema.alterTable(TableNames.callbackReq, table => {
    table
      .dropForeign('status_id');

    table
      .dropColumn('status_id');
  });
}
