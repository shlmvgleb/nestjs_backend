import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { Type } from 'class-transformer';

class PricingToDeleteDto {
  @ApiProperty({ description: 'some uuid of pricing', required: true })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;
}

export class DeletePricingDto {
  @ApiProperty({ type: [PricingToDeleteDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PricingToDeleteDto)
  pricing: PricingToDeleteDto[];
}


