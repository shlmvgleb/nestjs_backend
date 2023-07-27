import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';


export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.orderPromotion, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('promotion_type')
      .notNullable();

    table
      .string('promotion_condition')
      .notNullable();

    table
      .uuid('order_id')
      .notNullable();

    table
      .foreign('order_id')
      .references('id')
      .inTable(TableNames.order);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.orderPromotion);
}

