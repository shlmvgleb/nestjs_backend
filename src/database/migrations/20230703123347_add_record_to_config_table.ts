import { Knex } from 'knex';
import { TableNames } from '../../utils/helpers/table-names';
import { ValueTypeEnum } from '../../utils/enums/value.type.enum';

const phoneConfigId = '94a85a2b-f58a-466a-bd15-9d2b32b9bbaf';
const minAmountConfId = '479a70c0-e4c8-4640-94b0-51ef44ff8285';
const phoneConfigKey = 'PHONE_NUMBER_CONFIRMATION';
const minAmountConfKey = 'ORDER_MIN_AMOUNT';

export async function up(knex: Knex) {
  const phoneConfig = await knex(TableNames.configuration).where({ id: phoneConfigId });

  if (!phoneConfig.length) {
    await knex(TableNames.configuration).insert({
      id: phoneConfigId,
      key: phoneConfigKey,
      value: 'false',
      valueType: ValueTypeEnum.Boolean,
      description: 'Подтверждение номера телефона',
    });
  }

  const minAmountConfig = await knex(TableNames.configuration).where({ id: minAmountConfId });

  if (!minAmountConfig.length) {
    await knex(TableNames.configuration).insert({
      id: minAmountConfId,
      key: minAmountConfKey,
      value: '860',
      valueType: ValueTypeEnum.Float,
      description: 'Минимальная стоимость заказа',
    });
  }

  return knex;
}

export async function down(knex: Knex) {
  await knex(TableNames.configuration).del().where({ id: phoneConfigId });
  return knex(TableNames.configuration).del().where({ id: minAmountConfId });
}
