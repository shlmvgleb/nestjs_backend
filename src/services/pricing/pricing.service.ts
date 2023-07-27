import { Injectable } from '@nestjs/common';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { Pricing } from './entities/pricing.entity';
import { PricingQueryProperties } from './dtos/pricing-query.properties';
import { ProductService } from '../product/product.service';
import { getOrThrow } from '../../utils/helpers/getter';
import { PricingByIdNotFoundException } from '../../utils/exceptions/pricing-by-id-not-found.exception';
import { WrongCountRangeException } from '../../utils/exceptions/wrong-count-range.exception';
import { UpdatePricingDto } from './dtos/update.pricing.dto';
import { CreatePricingDto } from './dtos/create-pricing.dto';
import { DeletePricingDto } from './dtos/delete.pricing.dto';

@Injectable()
export class PricingService implements Pick<IBaseCRUDMethods, 'create' | 'update' | 'findAll' | 'findOneOrThrow' | 'restore'> {
  constructor(private productService: ProductService) {}

  async create(dto: CreatePricingDto) {
    const result: Pricing[] = [];
    for await (let price of dto.pricing) {
      const product = await this.productService.findOneOrThrow(price.productId);
      let mockCountTo = price.countTo;

      if (price.countTo === 0) {
        mockCountTo = 10 ** 5;
      }

      const pricingArray = await this.findAll({ productId: product.id });

      if (!pricingArray.length) {

        if (price.countFrom !== 1 || price.countFrom >= mockCountTo) {
          throw new WrongCountRangeException();
        }

        const priceEntity = await Pricing.query().insert(price).returning('*');
        result.push(priceEntity);
        continue;
      }

      const pricing = pricingArray.pop();

      if (price.countFrom - pricing.countTo !== 1 || price.countFrom >= mockCountTo) {
        throw new WrongCountRangeException();
      }

      const priceEntity = await Pricing.query().insert(price).returning('*');
      result.push(priceEntity);
    }

    return result;
  }

  async findAll(properties: PricingQueryProperties) {
    return Pricing
      .query()
      .whereNotDeleted()
      .skipUndefined()
      .where('productId', properties.productId)
      .orderBy('countFrom', 'asc');
  }

  async findOneOrThrow(id: string) {
    return getOrThrow<Pricing>(
      async () => Pricing.query().findById(id),
      new PricingByIdNotFoundException(id),
    );
  }

  async remove(dto: DeletePricingDto) {
    const result = [];
    for await (let value of dto.pricing) {
      const pricing = await this.findOneOrThrow(value.id);
      const price = await pricing.$query().delete().returning('*');
      result.push(price);
    }

    return result;
  }

  async restore(id: string) {
    const pricing = await this.findOneOrThrow(id);
    return Pricing
      .query()
      .where({ id: pricing.id })
      .undelete()
      .returning('*')
      .first();
  }

  async update(dto: UpdatePricingDto) {
    const result: Pricing[] = [];
    for await (let price of dto.pricing) {
      const pricing = await this.findOneOrThrow(price.id);
      let mockCountTo = price.countTo;

      if (price.countTo === 0) {
        mockCountTo = 10 ** 5;
      }

      if (price.countFrom >= mockCountTo) {
        throw new WrongCountRangeException();
      }

      const priceEntity = await pricing.$query().patchAndFetch(price);
      result.push(priceEntity);
    }

    return result;
  }
}
