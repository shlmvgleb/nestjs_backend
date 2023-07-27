import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    CategoryModule,
    BrandModule,
    FilesModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
