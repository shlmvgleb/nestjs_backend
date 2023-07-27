import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsIn, IsOptional, IsPhoneNumber, IsString, IsUUID, Length } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { OrderStatusEnum } from '../../../utils/enums/order-status.enum';
import { ClientTypeEnum } from '../../../utils/enums/client-type.enum';

export class UpdateOrderDto {
  @ApiProperty({ description: 'Uuid of order' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;

  @ApiProperty({ description: 'Order status', enum: OrderStatusEnum })
  @IsEnum(OrderStatusEnum, { message: ValidationEnum.NotOrderStatus })
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 'Some issues', description: 'Comment for Order' })
  @IsString({ message: ValidationEnum.NotString })
  @Length(0, 255, { message: ValidationEnum.TooBigCommentLength })
  @IsOptional()
  comment?: string;

  @ApiProperty({ example: 'Paris', description: 'City of order' })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'st. SomeStreet', description: 'Street of order' })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  street?: string;

  @ApiProperty({ example: '19/2', description: 'Building of order' })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  building?: string;

  @ApiProperty({ example: '18', description: 'Apartment number' })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  apartment?: string;

  @ApiProperty({ example: 'Ivanov Ivan' })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  fullName?: string;

  @IsPhoneNumber('RU', { message: ValidationEnum.IncorrectPhoneNumber })
  @ApiProperty({ example: '89995645423' })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'user@test.ru' })
  @IsEmail({}, { message: ValidationEnum.NotEmail })
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: ClientTypeEnum })
  @IsString({ message: ValidationEnum.NotString })
  @IsIn(Object.values(ClientTypeEnum))
  @IsOptional()
  clientType?: string;
}
