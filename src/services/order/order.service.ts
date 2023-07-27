import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/order.dto';
import { Model } from 'objection';
import { Order } from './entities/order.entity';
import { ConfirmCodeDTO } from './dtos/confirm-code.dto';
import { OrderByPhoneDTO } from './dtos/order-by-phone.dto';
import { OrderStatusEnum } from '../../utils/enums/order-status.enum';
import { OrderByIdNotFoundException } from '../../utils/exceptions/order-by-id-not-found.exception';
import { OrderTrxFailedException } from '../../utils/exceptions/order-trx-failed.exception';
import { getOrThrow } from '../../utils/helpers/getter';
import { OrderByPhoneNotFoundException } from '../../utils/exceptions/order-by-phone-not-found.exception';
import { ProductService } from '../product/product.service';
import { IOrderProductType } from './types/order-product.type';
import { RedisService } from '../../redis/redis.service';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { IOrderPromoType } from './types/order-promo.type';
import { PromotionService } from '../promotion/promotion.service';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { SmsService } from '../sms/sms.service';
import { RedisOrder } from './types/order-redis.type';
import { BannedPhoneException } from '../../utils/exceptions/banned-phone.exception';
import { WrongUuidOfConfirmReqException } from '../../utils/exceptions/wrong-uuid-of-confirm-req.exception';
import { WrongSmsCodeException } from '../../utils/exceptions/wrong-sms-code.exception';
import { ConfigService } from '@nestjs/config';
import { SmsConfig } from '../sms/config/sms.conf';
import { ConfigurationService } from '../config/configuration.service';
import { plainToInstance } from 'class-transformer';
import { isJSON } from 'class-validator';

const blackListKey = 'sms-black-list';

@Injectable()
export class OrderService implements Pick<IBaseCRUDMethods, 'create' | 'findAll' | 'findOneOrThrow' | 'update'> {
  constructor(
    private smsService: SmsService,
    private productService: ProductService,
    private redisService: RedisService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private promoService: PromotionService,
    private configService: ConfigService,
    private customConfService: ConfigurationService,
  ) {}

  private smsConfig = this.configService.get<SmsConfig>('sms');

  private readonly logger = new Logger(OrderService.name);

  async create(dto: CreateOrderDTO) {
    const isBanned = await this.redisService.get(`${blackListKey}:${dto.phone}`);

    if (isBanned) {
      throw new BannedPhoneException(dto.phone);
    }

    const configEntity = await this.customConfService.findOneByKeyOrThrow('PHONE_NUMBER_CONFIRMATION');
    const isSmsEnabled = JSON.parse(configEntity.value);

    if (!isSmsEnabled) {
      return this.straightCreate(dto);
    }

    const smsResponse = await this.smsService.sendCodeOnPhoneNumber(dto.phone);

    const confirmData: RedisOrder = {
      orderData: dto,
      badAttempts: 0,
      code: smsResponse.code,
    };
    const confirmString = JSON.stringify(confirmData);
    await this.redisService.set(smsResponse.uuid, confirmString, {
      EX: 600,
    });

    return {
      token: smsResponse.token,
    };
  }

  async confirmCode(dto: ConfirmCodeDTO) {
    const payload = await this.smsService.validateSmsToken(dto.token);
    const confirmationString = await this.redisService.get(payload.id);

    if (!confirmationString) {
      throw new WrongUuidOfConfirmReqException();
    }

    if (!isJSON(confirmationString)) {
      throw new WrongUuidOfConfirmReqException();
    }

    const confirmData = plainToInstance(RedisOrder, JSON.parse(confirmationString));

    if (!(confirmData instanceof RedisOrder)) {
      throw new WrongUuidOfConfirmReqException();
    }

    const isBanned = await this.redisService.get(`${blackListKey}:${confirmData.orderData.phone}`);

    if (isBanned) {
      throw new BannedPhoneException(confirmData.orderData.phone);
    }

    if (confirmData.code !== dto.code) {
      confirmData.badAttempts += 1;
      await this.redisService.set(payload.id, JSON.stringify(confirmData), {
        EX: 1800,
      });

      if (confirmData.badAttempts > this.smsConfig.maxCountOfSmsReq) {
        await this.redisService.set(`${blackListKey}:${confirmData.orderData.phone}`, confirmationString, {
          EX: 1800,
        });
        await this.redisService.delete(payload.id);
        throw new BannedPhoneException(confirmData.orderData.phone);
      }

      throw new WrongSmsCodeException();
    }

    await this.redisService.delete(payload.id);
    return this.straightCreate(confirmData.orderData);
  }

  async straightCreate(dto: CreateOrderDTO) {
    let orderFetched: Order;
    let order: Order;
    try {
      order = await Model.transaction(async trx => {
        const { promotions, products, ...orderDto } = dto;
        const pricing = await this.productService.findTotalAmount({ products: dto.products });
        const order = await Order.query(trx).insert({ ...orderDto, totalPrice: pricing.totalAmount });

        await order
          .$relatedQuery('status', trx)
          .insert({
            name: OrderStatusEnum.New,
          });

        const orderProducts: IOrderProductType[] = await Promise.all(
          pricing.products.map(async product => {
            const productEntity = await this.productService.findOneOrThrow(product.productId);
            const brand = await this.brandService.findOneOrThrow(productEntity.brandId);
            const category = await this.categoryService.findOneOrThrow(productEntity.categoryId);
            return {
              price: product.totalAmount,
              count: product.count,
              brandName: brand.name,
              categoryName: category.name,
              productName: productEntity.name,
            };
          }),
        );

        await order.$relatedQuery('orderProducts', trx).insert(orderProducts);

        if (promotions?.length) {
          const orderPromotions: IOrderPromoType[] = await Promise.all(
            promotions.map(async promoDto => {
              const promotion = await this.promoService.findOneOrThrow(promoDto.promotionId);
              return {
                promotionCondition: promotion.condition,
                promotionType: promotion.promoType,
                giftName: promotion.giftName,
              };
            }),
          );
          await order.$relatedQuery('orderPromotions', trx).insert(orderPromotions);
        }

        return order;
      });

      orderFetched =  await order.$query().withGraphFetched('[orderProducts, status, orderPromotions]');
    } catch (err) {
      this.logger.error(err);
      throw new OrderTrxFailedException();
    }

    return orderFetched;
  }

  async findOneOrThrow(id:string) {
    return getOrThrow(
      async () => Order.query().findById(id).withGraphFetched('[orderProducts, status, orderPromotions]'),
      new OrderByIdNotFoundException(id),
    );
  }

  async getLastOrderByPhone(dto: OrderByPhoneDTO) {
    const orders = await Order.query().where({ phone: dto.phone });

    if (!orders.length) {
      throw new OrderByPhoneNotFoundException(dto.phone);
    }

    return orders.pop();
  }

  async findAll() {
    return Order.query().withGraphFetched('[status, orderPromotions, orderProducts]');
  }

  async update(dto: UpdateOrderDto) {
    const order = await this.findOneOrThrow(dto.id);
    const { status, ...orderDto } = dto;
    await order.$query().patch(orderDto);

    if (status) {
      await order.$relatedQuery('status').patch({ name: status });
    }

    return order.$query().withGraphFetched('[status, orderPromotions, orderProducts]');
  }
}

