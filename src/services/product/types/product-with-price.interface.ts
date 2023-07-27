import { ApiProperty } from '@nestjs/swagger';

export class ProductWithPrice {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  count: number;
}
