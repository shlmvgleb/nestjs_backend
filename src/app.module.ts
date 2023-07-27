import { Module } from '@nestjs/common';
import { OrderModule } from './services/order/order.module';
import { DatabaseModule } from './database/database.module';
import { CallbackRequestModule } from './services/callback-request/callback-request.module';
import { CategoryModule } from './services/category/category.module';
import { BrandModule } from './services/brand/brand.module';
import { FilesModule } from './services/files/files.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import { ProductModule } from './services/product/product.module';
import { RedisModule } from './redis/redis.module';
import { PricingModule } from './services/pricing/pricing.module';
import { PromotionModule } from './services/promotion/promotion.module';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './services/user/user.module';
import { ConfigurationModule } from './services/config/config.module';
import { SmsModule } from './services/sms/sms.module';

@Module({
  imports: [
    OrderModule,
    DatabaseModule,
    CallbackRequestModule,
    CategoryModule,
    BrandModule,
    FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ProductModule,
    RedisModule,
    PricingModule,
    PromotionModule,
    AuthModule,
    UserModule,
    ConfigurationModule,
    SmsModule,
  ],
})
export class AppModule {}
