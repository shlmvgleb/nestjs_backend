export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    client: 'pg',
    dbName: process.env.POSTGRES_DB_NAME,
    user: process.env.POSTGRES_USER,
    pwd: process.env.POSTGRES_PWD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
  },
  cloud: {
    s3: {
      path: {
        logo: process.env.BUCKET_NAME_LOGO || 'logo',
        product: process.env.BUCKET_NAME_PRODUCT || 'product',
      },
      reg: {
        keyId: process.env.YC_KEY_ID,
        secretKey: process.env.YC_SECRET_KEY,
        bucketName: process.env.BUCKET_NAME,
      },
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  jwt: {
    refreshSecret: process.env.JWT_RT_SECRET,
    accessSecret: process.env.JWT_AT_SECRET,
    accessExp: process.env.JWT_AT_EXP || '24h',
    refreshExp: process.env.JWT_RT_EXP || '2w',
  },
  sms: {
    login: process.env.SMS_LOGIN,
    password: process.env.SMS_PASSWORD,
    secret: process.env.JWT_SMS_SECRET,
    tokenExp: process.env.JWT_SMS_EXP || '30m',
    maxCountOfSmsReq: process.env.MAX_COUNT_OF_SMS_REQ || 3,
  },
});
