import { OmitType } from '@nestjs/swagger';
import { Product } from '../../services/product/entities/product.entity';

export class ProductWithoutEager extends OmitType(Product, ['category', 'brand', 'pricing'] as const) {}
