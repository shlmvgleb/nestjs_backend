import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
  imports: [FilesModule],
})
export class BrandModule {}
