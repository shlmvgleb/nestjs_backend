import { AddProductToOrderDto } from './add-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsIn, IsOptional, IsPhoneNumber, IsString, Length, ValidateNested } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { Type } from 'class-transformer';
import { ClientTypeEnum } from '../../../utils/enums/client-type.enum';
import { AddPromoToOrder } from './add-promo.dto';

export class CreateOrderDTO {

  @ApiProperty({ type: [AddProductToOrderDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddProductToOrderDto)
  products: AddProductToOrderDto[];

  @ApiProperty({ type: [AddPromoToOrder], description: 'Если условия выполнены, подставляем массив с uuid акции' })
  @ValidateNested({ each: true })
  @Type(() => AddPromoToOrder)
  @IsArray()
  @IsOptional()
  promotions?: AddPromoToOrder[];

  @ApiProperty({ example: 'Some issues', description: 'Comment for Order' })
  @IsString({ message: ValidationEnum.NotString })
  @Length(0, 255, { message: ValidationEnum.TooBigCommentLength })
  comment: string;

  @ApiProperty({ example: 'Paris', description: 'City of order' })
  @IsString({ message: ValidationEnum.NotString })
  city: string;

  @ApiProperty({ example: 'st. SomeStreet', description: 'Street of order' })
  @IsString({ message: ValidationEnum.NotString })
  street: string;

  @ApiProperty({ example: '19/2', description: 'Building of order' })
  @IsString({ message: ValidationEnum.NotString })
  building: string;

  @ApiProperty({ example: '18', description: 'Apartment number' })
  @IsString({ message: ValidationEnum.NotString })
  apartment: string;

  @ApiProperty({ example: 'Ivanov Ivan' })
  @IsString({ message: ValidationEnum.NotString })
  fullName: string;

  @IsPhoneNumber('RU', { message: ValidationEnum.IncorrectPhoneNumber })
  @ApiProperty({ example: '89995645423' })
  phone: string;

  @ApiProperty({ example: 'user@test.ru' })
  @IsEmail({}, { message: ValidationEnum.NotEmail })
  email: string;

  @ApiProperty({ enum: ClientTypeEnum })
  @IsString({ message: ValidationEnum.NotString })
  @IsIn(Object.values(ClientTypeEnum))
  clientType: string;
}
