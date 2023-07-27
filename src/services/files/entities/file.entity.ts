import { Model } from 'objection';
import { Brand } from '../../brand/entities/brand.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDeletableModel } from '../../../database/base-deletable.model';


export class File extends BaseDeletableModel {
  static get tableName() {
    return 'file';
  }

  @ApiProperty()
  url: string;

  @ApiProperty()
  key: string;

  brand: Brand;

  static get relationMappings() {
    return {
      brand: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'file.id',
          to: 'brand.fileId',
        },
      },
    };
  }
}
