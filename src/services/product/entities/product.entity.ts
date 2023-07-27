import { BaseDeletableModel } from '../../../database/base-deletable.model';
import { Pricing } from '../../pricing/entities/pricing.entity';
import { Order } from '../../order/entities/order.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Model } from 'objection';
import { File } from '../../files/entities/file.entity';
import { Category } from '../../category/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryWithoutEager } from '../../../utils/swagger-types/category-wothout-eager';

export class Product extends BaseDeletableModel {
  static get tableName() {
    return 'product';
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  fileId: string;

  @ApiProperty()
  brandId: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty({ type: () => [Pricing] })
  pricing: Pricing[];

  orders: Order[];

  @ApiProperty({ type: () => Brand })
  brand: Brand;

  file: File;

  @ApiProperty({ type: () => CategoryWithoutEager })
  category: Category;

  static get relationMappings() {
    return {
      pricing: {
        relation: Model.HasManyRelation,
        modelClass: Pricing,
        join: {
          from: 'product.id',
          to: 'pricing.productId',
        },
      },
      brand: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'product.brandId',
          to: 'brand.id',
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'product.categoryId',
          to: 'category.id',
        },
      },
      file: {
        relation: Model.HasOneRelation,
        modelClass: File,
        join: {
          from: 'product.fileId',
          to: 'file.id',
        },
      },
    };
  }

}
