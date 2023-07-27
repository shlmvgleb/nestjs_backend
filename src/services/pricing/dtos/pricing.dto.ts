import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, ValidateIf } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class PricingDto {
  @ApiProperty({ description: 'От' })
  @IsInt({ message: ValidationEnum.NotInt })
  countFrom: number;

  @ApiProperty({ description: 'До (если равно null, то диапазон от countFrom до бесконечности)' })
  @IsInt({ message: ValidationEnum.NotInt })
  @ValidateIf((object, value) => value !== null)
  countTo: number;

  @ApiProperty({ description: 'Цена' })
  @IsInt({ message: ValidationEnum.NotInt })
  price: number;

  @ApiProperty({ description: 'some uuid of product' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  productId: string;
}
