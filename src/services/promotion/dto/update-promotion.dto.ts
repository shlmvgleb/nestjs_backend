import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePromotionDto } from './create-promotion.dto';
import { IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {
  @ApiProperty({ description: 'some uuid of promo' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;
}
