import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { Product } from '../product/entities/product.entity';
import { getOrThrow } from '../../utils/helpers/getter';
import { BrandByIdNotFoundException } from '../../utils/exceptions/brand-by-id-not-found.exception';
import { FilesService } from '../files/files.service';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';

@Injectable()
export class BrandService implements IBaseCRUDMethods {

  constructor(private fileService: FilesService) {
  }

  async create(dto: CreateBrandDto) {
    if (dto.fileId) {
      await this.fileService.findOneOrThrow(dto.fileId);
    }
    return Brand.query().insert(dto);
  }

  findAll() {
    return Brand.query().whereNotDeleted();
  }

  async findOneOrThrow(id: string) {
    return getOrThrow(
      async () => Brand
        .query()
        .findById(id),
      new BrandByIdNotFoundException(id),
    );
  }

  async update(dto: UpdateBrandDto) {
    const brand = await this.findOneOrThrow(dto.id);
    if (dto.fileId) {
      await this.fileService.findOneOrThrow(dto.fileId);
    }
    return brand.$query().patch(dto).returning('*');
  }

  async remove(id: string) {
    const brand = await this.findOneOrThrow(id);
    await Product.query().where('brandId', id).delete();
    return brand.$query().delete().returning('*');
  }

  async restore(id: string) {
    const brand = await this.findOneOrThrow(id);
    await Product.query().where('brandId', brand.id).undelete();
    return Brand
      .query()
      .where('id', brand.id)
      .undelete()
      .returning('*')
      .first();
  }
}
