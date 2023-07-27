import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SmsSenderService } from './sms/sms-sender.service';
import { ProductModule } from '../product/product.module';
import { RedisModule } from '../../redis/redis.module';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';
import { PromotionModule } from '../promotion/promotion.module';
import { SmsModule } from '../sms/sms.module';
import { ConfigurationModule } from '../config/config.module';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    SmsSenderService,
  ],
  imports: [
    ProductModule,
    RedisModule,
    CategoryModule,
    BrandModule,
    PromotionModule,
    SmsModule,
    ConfigurationModule,
  ],
  exports: [OrderService],
})
export class OrderModule {}
