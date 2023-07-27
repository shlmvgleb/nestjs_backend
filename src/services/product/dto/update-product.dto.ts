import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'uuid of product' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;
}
