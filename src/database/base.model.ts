import { Model } from 'objection';
import { ApiProperty } from '@nestjs/swagger';

export class BaseModel extends Model {

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
