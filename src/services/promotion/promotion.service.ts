import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { Promotion } from './entities/promotion.entity';
import { ProductService } from '../product/product.service';
import { FilesService } from '../files/files.service';
import { BrandService } from '../brand/brand.service';
import { getOrThrow } from '../../utils/helpers/getter';
import { PromotionByIdNotFoundException } from '../../utils/exceptions/promotion-by-id-not-found.exception';
import { PromoQueryProperties } from './dto/promo-query-properties';


@Injectable()
export class PromotionService implements IBaseCRUDMethods {
  constructor(
    private productService: ProductService,
    private fileService: FilesService,
    private brandService: BrandService,
  ) {}

  async create(dto: CreatePromotionDto) {
    await this.brandService.findOneOrThrow(dto.brandId);
    await this.productService.findOneOrThrow(dto.productId);
    if (dto.fileId) {
      await this.fileService.findOneOrThrow(dto.fileId);
    }
    return Promotion.query().insert(dto).returning('*');
  }

  async findAll(properties: PromoQueryProperties) {
    return Promotion
      .query()
      .whereNotDeleted()
      .skipUndefined()
      .where('brandId', properties.brandId)
      .where('promoType', properties.promoType);
  }

  async findOneOrThrow(id: string) {
    return getOrThrow(
      async () => Promotion.query().findById(id),
      new PromotionByIdNotFoundException(id),
    );
  }

  async update(dto: UpdatePromotionDto) {
    const promotion = await this.findOneOrThrow(dto.id);
    if (dto.brandId) {
      await this.brandService.findOneOrThrow(dto.brandId);
    }
    if (dto.productId) {
      await this.productService.findOneOrThrow(dto.productId);
    }
    if (dto.fileId) {
      await this.fileService.findOneOrThrow(dto.fileId);
    }
    return promotion.$query().patch(dto).returning('*');
  }

  async remove(id: string) {
    const promotion = await this.findOneOrThrow(id);
    return promotion.$query().delete().returning('*');
  }

  async restore(id: string) {
    const promotion = await this.findOneOrThrow(id);
    return Promotion.query().where({ id: promotion.id }).undelete().returning('*');
  }
}
