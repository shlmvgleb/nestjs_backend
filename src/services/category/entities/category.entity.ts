import { Model } from 'objection';
import { BaseDeletableModel } from '../../../database/base-deletable.model';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryWithoutEager } from '../../../utils/swagger-types/category-wothout-eager';

export class Category extends BaseDeletableModel {

  static get tableName() {
    return 'category';
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  priority: number;

  @ApiProperty({ nullable: true })
  parentId: string;

  @ApiProperty({ type: [CategoryWithoutEager] })
  childCategories: CategoryWithoutEager[];

  products: Product[];

  static get relationMappings() {
    return {
      childCategories: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: 'category.id',
          to: 'category.parentId',
        },
      },
      parentCategory: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'category.parentId',
          to: 'category.id',
        },
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'category.id',
          to: 'product.categoryId',
        },
      },
    };
  }
}
