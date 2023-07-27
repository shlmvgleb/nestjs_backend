import { BaseModel } from '../../../database/base.model';
import { Order } from './order.entity';
import { Model } from 'objection';
import { ApiProperty } from '@nestjs/swagger';

export class OrderPromo extends BaseModel {

  static get tableName() {
    return 'orderPromotion';
  }

  @ApiProperty()
  promotionType: string;

  @ApiProperty()
  promotionCondition: string;

  @ApiProperty()
  giftName: string;

  @ApiProperty()
  orderId: string;

  order: Order;

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'orderPromotion.orderId',
          to: 'order.id',
        },
      },
    };
  }
}
