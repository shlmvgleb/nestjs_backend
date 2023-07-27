import objectionSoftDelete from 'objection-js-soft-delete';
import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';

const softDelete = objectionSoftDelete({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

export class BaseDeletableModel extends softDelete(BaseModel) {
  @ApiProperty()
  readonly id: string;

  @ApiProperty({ nullable: true })
  deletedAt: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
