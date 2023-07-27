import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { AddProductToOrderDto } from '../../order/dtos/add-product.dto';
import { AddProductToFindTotalAmountDto } from './add-product-to-find-total-amount.dto';
import { Type } from 'class-transformer';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class FindTotalAmountDto {
  @ApiProperty({ type: [AddProductToOrderDto] })
  @IsArray({ message: ValidationEnum.NotArray })
  @Type(() => AddProductToOrderDto)
  @ValidateNested({ each: true })
  products: AddProductToFindTotalAmountDto[];
}
