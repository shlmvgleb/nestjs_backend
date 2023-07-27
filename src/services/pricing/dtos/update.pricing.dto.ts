import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { PricingToUpdateDto } from './pricing-to-update.dto';
import { Type } from 'class-transformer';

export class UpdatePricingDto {
  @ApiProperty({ type: [PricingToUpdateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PricingToUpdateDto)
  pricing: PricingToUpdateDto[];
}
