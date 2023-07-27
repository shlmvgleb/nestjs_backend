import { Model } from 'objection';
import { File } from '../../files/entities/file.entity';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDeletableModel } from '../../../database/base-deletable.model';


export class Brand extends BaseDeletableModel {

  static get tableName() {
    return 'brand';
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  fileId: string;

  products: Product[];

  file: File;

  static get relationMappings() {
    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'brand.id',
          to: 'product.brandId',
        },
      },
      file: {
        relation: Model.HasOneRelation,
        modelClass: File,
        join: {
          from: 'brand.fileId',
          to: 'file.id',
        },
      },
    };
  }
}
