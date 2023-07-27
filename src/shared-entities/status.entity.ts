import { BaseModel } from '../database/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../services/order/entities/order.entity';
import { Model } from 'objection';
import { CallbackRequest } from '../services/callback-request/entities/callback-request.entity';

export class Status extends BaseModel {
  static get tableName() {
    return 'status';
  }

  @ApiProperty()
  name: string;

  static get relationMappings() {
    return {
      order: {
        modelClass: Order,
        relation: Model.HasOneRelation,
        join: {
          from: 'status.id',
          to: 'order.statusId',
        },
      },
      callback: {
        modelClass: CallbackRequest,
        relation: Model.HasOneRelation,
        join: {
          from: 'status.id',
          to: 'callbackRequest.statusId',
        },
      },
    };
  }
}
