# API

## Description
REST API on Nestjs for ecommerce. Stack: PostgreSQL(knexjs as a query builder + objectionjs as an ORM), Redis, Yandex Cloud S3.

## Swagger

### Link 
`http://${HOST_NAME}:${PORT}/api`

# Docker

## Build and start


```bash
docker-compose up -d --build -V
```

## Stop
```bash
docker-compose down
```

# Application

## Installation
```bash
yarn install
```
## Migration
#### Create: 
Для создания миграций необходим migration.stub файл в директории src/database в качестве шаблона.
```bash
yarn run knex migrate:make ${migration_name}
```

#### Run:
```bash
yarn migrate
```

## Seed
#### Create:
Для создания сидов необходим seed.stub файл в директории src/database в качестве шаблона.
```bash
yarn run knex seed:make ${seed_name}
```

#### Run:
```bash
yarn seed
```

## Running the app in watch mode
```bash
yarn start:dev
```



# Environment

| env                  | default value  | description                            |
|:---------------------|:---------------|:---------------------------------------|
| PORT                 | 3000           | App port                               |
| POSTGRES_HOST        | postgres       | Database host                          |
| POSTGRES_PORT        | 5532           | Database port                          |
| POSTGRES_DB_NAME     | core           | Database name                          |
| POSTGRES_USER        | postgres       | Database user                          |
| POSTGRES_PWD         |                | Database pwd (empty in docker)         |
| REDIS_HOST           | localhost      | Redis host                             |
| REDIS_PORT           | 6380           | Redis port                             |
| YC_KEY_ID            |                | Yandex cloud key id (secret)           |
| YC_SECRET_KEY        |                | Yandex cloud secret key (secret)       |
| BUCKET_NAME          | some bucket    | S3 bucket name                         |
| BUCKET_NAME_LOGO     | logo           | S3 name of path with logos             |
| BUCKET_NAME_PRODUCT  | product        | S3 name of path with products          |
| JWT_RT_SECRET        |                | JWT refresh token secret key (secret)  |
| JWT_AT_SECRET        |                | JWT access token secret key (secret)   |
| JWT_RT_EXP           | 7d             | Expiration of refresh token            |
| JWT_AT_EXP           | 15m            | Expiration of access token             |
| JWT_SMS_SECRET       |                | JWT sms token secret key (secret)      |
| JWT_SMS_EXP          | 30m            | Expiration of sms service token        |
| SMS_LOGIN            |                | Login for sms service (secret)         |
| SMS_PASSWORD         |                | Password for sms service (secret)      |
| MAX_COUNT_OF_SMS_REQ | 5              | Max count of sms confirmation requests |
