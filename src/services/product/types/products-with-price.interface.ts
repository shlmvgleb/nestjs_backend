import { ProductWithPrice } from './product-with-price.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ProductsWithTotalPrice {
  @ApiProperty({
    type: [ProductWithPrice],
    description: 'Товары с их количеством и ценой',
  })
  products: ProductWithPrice[];

  @ApiProperty({ description: 'Цена всех товаров' })
  totalAmount: number;
}
