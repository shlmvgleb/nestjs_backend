import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [NestjsFormDataModule],
  exports: [FilesService],
})
export class FilesModule {}
