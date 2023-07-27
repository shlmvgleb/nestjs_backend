import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';
import { RoleEnum } from '../../utils/enums/role.enum';
import { Logger } from '@nestjs/common';

const logger = new Logger('Seed');
const userLogin = 'admin';
const userPassword = '$2a$12$/LX6iyVmLvhv6j4aGQCrr.dFovtu/br4O9ryDjwrJQ5YF0nPpWC9C';
const tokenId = '52a82d37-96b4-4653-9c5a-a4bf8ec84734';
const roleId = '52a82d37-96b4-4653-9c5a-a4bf8ec84734';
const userId = '52a82d37-96b4-4653-9c5a-a4bf8ec84734';

export async function seed(knex: Knex) {
  const users = await knex(TableNames.user).where({ login: userLogin });

  if (users.length) {
    logger.error(`Пользователь с логином '${userLogin}' уже существует!`);
    return knex;
  }

  await knex(TableNames.tokens).insert({
    id: tokenId,
  });

  await knex(TableNames.role).insert({
    id: roleId,
    name: RoleEnum.Admin,
  });

  await knex(TableNames.user).insert({
    id: userId,
    login: userLogin,
    password: userPassword,
    tokensId: tokenId,
  });

  return knex(TableNames.userRole).insert({
    userId: userId,
    roleId: roleId,
  });
}
