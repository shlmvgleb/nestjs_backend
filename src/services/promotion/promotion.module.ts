import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { ProductModule } from '../product/product.module';
import { FilesModule } from '../files/files.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService],
  imports: [
    ProductModule,
    FilesModule,
    BrandModule,
  ],
  exports: [
    PromotionService,
  ],
})
export class PromotionModule {}
