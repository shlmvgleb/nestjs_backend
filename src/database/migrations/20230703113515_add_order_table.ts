import { Knex } from 'knex';
import { ClientTypeEnum } from '../../utils/enums/client-type.enum';
import { TableNames } from '../../utils/helpers/table-names';


export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.order, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('comment')
      .notNullable();

    table
      .string('full_name');

    table
      .string('phone')
      .notNullable();

    table
      .string('email')
      .notNullable();

    table
      .string('city')
      .notNullable();

    table
      .string('street')
      .notNullable();

    table
      .string('building')
      .notNullable();

    table
      .string('apartment', 20)
      .notNullable();

    table
      .enu('client_type', Object.values(ClientTypeEnum))
      .notNullable();

    table
      .decimal('total_price');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.order);
}

