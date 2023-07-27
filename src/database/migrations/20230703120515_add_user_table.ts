import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';

const phoneNumberRegex = '^(\\+7)\\?[0-9]{3}[0-9]{3}[0-9]{2}\\?[0-9]{2}$';

export async function up(knex: Knex) {
  await knex.schema.createTable(TableNames.user, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('login')
      .unique()
      .notNullable();

    table
      .string('password')
      .notNullable();

    table
      .uuid('device_id')
      .nullable();

    table
      .timestamps(true, true);
  });

  return knex
    .schema
    .raw(
      `alter table public.${TableNames.user} 
                   add column phone varchar(255), 
                   add constraint user_phone_unique unique (phone),
                   add constraint user_phone_check check (phone ~ '${phoneNumberRegex}')`,
    );
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.user);
}

