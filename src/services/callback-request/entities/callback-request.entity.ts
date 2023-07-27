import { BaseModel } from '../../../database/base.model';
import { Model } from 'objection';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../shared-entities/status.entity';

export class CallbackRequest extends BaseModel {

  static get tableName() {
    return 'callbackRequest';
  }

  @ApiProperty()
  phone: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  statusId: string;

  @ApiProperty({ description: 'Status entity', type: () => Status })
  status: Status;

  @ApiProperty({ nullable: true, description: 'Callback request metadata' })
  metaData: string;

  static get relationMappings() {
    return {
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'callbackRequest.statusId',
          to: 'status.id',
        },
      },
    };
  }
}
