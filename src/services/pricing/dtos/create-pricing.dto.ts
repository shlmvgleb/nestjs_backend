import { PricingDto } from './pricing.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePricingDto {

  @ApiProperty({ type: [PricingDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PricingDto)
  pricing: PricingDto[];
}
