import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';
import { ValueTypeEnum } from '../../utils/enums/value.type.enum';


export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.configuration, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('key')
      .notNullable()
      .unique();

    table
      .string('value')
      .notNullable();

    table
      .enum('value_type', Object.values(ValueTypeEnum))
      .notNullable();

    table
      .string('description', 1000);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.configuration);
}
