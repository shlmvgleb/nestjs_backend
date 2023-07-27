import { Order } from '../../services/order/entities/order.entity';
import { OrderProduct } from '../../services/order/entities/order-product.entity';
import { Product } from '../../services/product/entities/product.entity';
import { Category } from '../../services/category/entities/category.entity';
import { Brand } from '../../services/brand/entities/brand.entity';
import { Pricing } from '../../services/pricing/entities/pricing.entity';
import { File } from '../../services/files/entities/file.entity';
import { CallbackRequest } from '../../services/callback-request/entities/callback-request.entity';
import { Promotion } from '../../services/promotion/entities/promotion.entity';
import { OrderPromo } from '../../services/order/entities/order-promo.entity';
import { Status } from '../../shared-entities/status.entity';
import { User } from '../../services/user/entities/user.entity';
import { ConfigEntity } from '../../services/config/entities/config.entity';
import { Role } from '../../services/user/entities/role.entity';
import { UserRole } from '../../services/user/entities/user-role.entity';
import { Tokens } from '../../services/user/entities/tokens.entity';

export const TableNames = {
  order: Order.tableName,
  orderProduct: OrderProduct.tableName,
  product: Product.tableName,
  brand: Brand.tableName,
  category: Category.tableName,
  pricing: Pricing.tableName,
  file: File.tableName,
  callbackReq: CallbackRequest.tableName,
  promotion: Promotion.tableName,
  orderPromotion: OrderPromo.tableName,
  status: Status.tableName,
  user: User.tableName,
  configuration: ConfigEntity.tableName,
  tokens: Tokens.tableName,
  role: Role.tableName,
  userRole: UserRole.tableName,
};
