import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { ProductModule } from '../product/product.module';

@Module({
  providers: [PricingService],
  controllers: [PricingController],
  imports: [ProductModule],
  exports: [PricingService],
})
export class PricingModule {}
