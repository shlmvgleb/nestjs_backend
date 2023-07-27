import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import * as dotenv from 'dotenv';

dotenv.config({
  debug: true,
  path: '../../.env', // по-другому он чет работать не хотел
});

const dbConfig: Knex.Config = {
  client: 'pg',
  connection: {
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_PWD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
  },
  migrations: {
    directory: './migrations',
    stub: './migration.stub',
  },
  seeds: {
    directory: './seeds',
    stub: './seed.stub',
  },
  debug: true,
  ...knexSnakeCaseMappers(),
};

export default dbConfig;
