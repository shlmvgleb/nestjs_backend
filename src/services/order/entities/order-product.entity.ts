import { BaseModel } from '../../../database/base.model';
import { Order } from './order.entity';
import { Model } from 'objection';
import { ApiProperty } from '@nestjs/swagger';

export class OrderProduct extends BaseModel {

  static get tableName() {
    return 'orderProduct';
  }

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  categoryName: string;

  @ApiProperty()
  brandName: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  price: number;

  order: Order;

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'orderProduct.orderId',
          to: 'order.id',
        },
      },
    };
  }

}
