import { OmitType } from '@nestjs/swagger';
import { Order } from '../../services/order/entities/order.entity';

export class OrderWithoutEager extends OmitType(Order, ['status', 'orderProducts', 'orderPromotions'] as const) {}
