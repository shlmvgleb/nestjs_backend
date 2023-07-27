import { ApiProperty } from '@nestjs/swagger';
import { BaseDeletableModel } from '../../../database/base-deletable.model';

export class Pricing extends BaseDeletableModel {

  static get tableName() {
    return 'pricing';
  }

  @ApiProperty()
  countFrom: number;

  @ApiProperty()
  countTo: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  productId: string;
}
