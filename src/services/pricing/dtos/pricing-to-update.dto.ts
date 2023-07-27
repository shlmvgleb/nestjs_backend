import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class PricingToUpdateDto {
  @ApiProperty({ description: 'some uuid of pricing', required: true })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;

  @ApiProperty({ description: 'От' })
  @IsInt({ message: ValidationEnum.NotInt })
  @IsOptional()
  countFrom?: number;

  @ApiProperty({ description: 'До (если равно 0, то диапазон от countFrom до бесконечности)' })
  @IsInt({ message: ValidationEnum.NotInt })
  @IsOptional()
  countTo?: number;

  @ApiProperty({ description: 'Цена' })
  @IsInt({ message: ValidationEnum.NotInt })
  @IsOptional()
  price?: number;
}
