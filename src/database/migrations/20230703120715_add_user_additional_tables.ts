import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';
import { RoleEnum } from '../../utils/enums/role.enum';

export async function up(knex: Knex) {
  await knex.schema.createTable(TableNames.tokens, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('refresh_token', 1000);
  });

  await knex.schema.alterTable(TableNames.user, table => {
    table
      .uuid('tokens_id');

    table
      .foreign('tokens_id')
      .references('id')
      .inTable(TableNames.tokens);
  });

  await knex.schema.createTable(TableNames.role, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .enum('name', Object.values(RoleEnum));
  });

  await knex.schema.createTable(TableNames.userRole, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .uuid('user_id');

    table
      .uuid('role_id');

    table
      .foreign('user_id')
      .references('id')
      .inTable(TableNames.user);

    table
      .foreign('role_id')
      .references('id')
      .inTable(TableNames.role);
  });

  return knex;
}

export async function down(knex: Knex) {
  await knex.schema.dropTable(TableNames.tokens);

  await knex.schema.dropTable(TableNames.role);

  await knex.schema.dropTable(TableNames.userRole);

  return knex;
}
