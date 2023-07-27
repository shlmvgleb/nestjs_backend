import { BaseModel } from '../../../database/base.model';
import { Model } from 'objection';
import { OrderProduct } from './order-product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderPromo } from './order-promo.entity';
import { Status } from '../../../shared-entities/status.entity';

export class Order extends BaseModel {

  static get tableName() {
    return 'order';
  }

  @ApiProperty()
  comment: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  apartment: string;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty({ type:  [OrderProduct] })
  orderProducts: OrderProduct[];

  @ApiProperty({ type: () => [OrderPromo] })
  orderPromotions;

  @ApiProperty()
  statusId: string;

  @ApiProperty({ description: 'Status entity', type: Status })
  status: Status;

  static get relationMappings() {
    return {
      orderProducts: {
        relation: Model.HasManyRelation,
        modelClass: OrderProduct,
        join: {
          from: 'order.id',
          to: 'orderProduct.orderId',
        },
      },
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'order.statusId',
          to: 'status.id',
        },
      },
      orderPromotions: {
        relation: Model.HasManyRelation,
        modelClass: OrderPromo,
        join: {
          from: 'order.id',
          to: 'orderPromotion.orderId',
        },
      },
    };
  }
}
