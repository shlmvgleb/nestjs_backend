import { Inject, Module, OnModuleInit } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Connection, KNEX_CONNECTION, ObjectionModule } from '@willsoto/nestjs-objection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { knexSnakeCaseMappers } from 'objection';
import { Order } from '../services/order/entities/order.entity';
import { Brand } from '../services/brand/entities/brand.entity';
import { Category } from '../services/category/entities/category.entity';
import { CallbackRequest } from '../services/callback-request/entities/callback-request.entity';
import { Pricing } from '../services/pricing/entities/pricing.entity';
import { File } from '../services/files/entities/file.entity';
import { Product } from '../services/product/entities/product.entity';
import { OrderProduct } from '../services/order/entities/order-product.entity';
import { Status } from '../shared-entities/status.entity';
import { Promotion } from '../services/promotion/entities/promotion.entity';
import { OrderPromo } from '../services/order/entities/order-promo.entity';
import { PostgresConnectionError } from '../utils/exceptions/postgres-connection.error';

dotenv.config();

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const dbConfig = config.get<DatabaseConfig>('database');
        return {
          config: {
            client: dbConfig.client,
            debug: true,
            connection: {
              database: dbConfig.dbName,
              user: dbConfig.user,
              password: dbConfig.pwd,
              host: dbConfig.host,
              port: dbConfig.port,
            },
            ...knexSnakeCaseMappers(),
          },
        };
      },
    }),
    ObjectionModule.forFeature( [
      Order,
      Brand,
      Category,
      CallbackRequest,
      Pricing,
      File,
      Product,
      OrderProduct,
      Status,
      Promotion,
      OrderPromo,
    ]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule implements OnModuleInit {
  constructor(@Inject(KNEX_CONNECTION) public connection: Connection) {}

  async onModuleInit() {
    try {
      await this.connection.raw('SELECT 1');
    } catch (error) {
      throw new PostgresConnectionError(error.code);
    }
  }
}
