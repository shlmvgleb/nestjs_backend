import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { getOrThrow } from '../../utils/helpers/getter';
import { ProductByIdNotFoundException } from '../../utils/exceptions/product-by-id-not-found.exception';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { Product } from './entities/product.entity';
import { FilesService } from '../files/files.service';
import { FindTotalAmountDto } from './dto/products-to-calculate-price.dto';
import { ProductsWithTotalPrice } from './types/products-with-price.interface';
import { ProductWithPrice } from './types/product-with-price.interface';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { PricingByProductIdNotFoundException } from '../../utils/exceptions/pricing-by-product-id-not-found.exception';
import { WrongCountRangeException } from '../../utils/exceptions/wrong-count-range.exception';

@Injectable()
export class ProductService implements IBaseCRUDMethods {
  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateProductDto) {
    await this.categoryService.findOneOrThrow(dto.categoryId);
    await this.brandService.findOneOrThrow(dto.brandId);
    if (dto.fileId) {
      await this.fileService.findOneOrThrow(dto.fileId);
    }
    return Product.query().insert(dto);
  }

  async findAll(properties) {
    const property = properties.sort?.split('-')[0];
    const direction: 'asc' | 'desc' = properties.sort?.split('-')[1];
    return Product
      .query()
      .whereNotDeleted()
      .skipUndefined()
      .where('categoryId', properties.categoryId)
      .where('brandId', properties.brandId)
      .where('fileId', properties.fileId)
      .where('name', properties.name)
      .where('description', properties.description)
      .withGraphFetched('[category(notDeleted), brand(notDeleted), pricing(notDeleted)]')
      .orderBy(property, direction)
      .modifyGraph('pricing(notDeleted)', builder => {
        return builder.orderBy('countFrom');
      });
  }

  findOneOrThrow(id: string) {
    return getOrThrow(
      async () => Product
        .query()
        .findById(id)
        .withGraphFetched('[category, brand, pricing]'),
      new ProductByIdNotFoundException(id),
    );
  }

  async update(dto: UpdateProductDto) {
    const product = await this.findOneOrThrow(dto.id);

    if (dto.categoryId) {
      await this.categoryService.findOneOrThrow(dto.categoryId);
    }

    if (dto.fileId) {
      await this.fileService.findOneOrThrow(dto.fileId);
    }

    if (dto.brandId) {
      await this.brandService.findOneOrThrow(dto.brandId);
    }

    return product.$query().patch(dto).returning('*');
  }

  async remove(id: string) {
    const product = await this.findOneOrThrow(id);
    return product.$query().delete().returning('*');
  }

  async restore(id: string) {
    const product = await this.findOneOrThrow(id);
    return Product
      .query()
      .where('id', product.id)
      .undelete()
      .returning('*')
      .first();
  }

  async findTotalAmount(dto: FindTotalAmountDto): Promise<ProductsWithTotalPrice> {
    let totalForAll = 0;

    const productsWithPrice: ProductWithPrice[] = await Promise.all(
      dto.products.map(async product => {
        const productEntity = await this.findOneOrThrow(product.productId);
        const pricingArray  = await productEntity.$relatedQuery('pricing');

        if (!pricingArray.length) {
          throw new PricingByProductIdNotFoundException(productEntity.id);
        }

        let totalForProduct = 0;

        pricingArray.forEach(pricing => {
          let mockCountTo = pricing.countTo;

          if (pricing.countTo === 0) {
            mockCountTo = 10 ** 5;
          }

          if (pricing.countFrom <= product.count && mockCountTo >= product.count) {
            totalForProduct += pricing.price * product.count;
          }
        });

        totalForAll += totalForProduct;

        if (!totalForProduct) {
          throw new WrongCountRangeException(); // just for safety from bad diapason updates in prices
        }

        return {
          productId: product.productId,
          totalAmount: totalForProduct,
          count: product.count,
        };
      }),
    );

    return {
      products: productsWithPrice,
      totalAmount: totalForAll,
    };
  }

}
