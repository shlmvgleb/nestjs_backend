import { CreateOrderDTO } from '../dtos/order.dto';

export class RedisOrder {
  orderData: CreateOrderDTO;

  badAttempts: number;

  code: number;
}

