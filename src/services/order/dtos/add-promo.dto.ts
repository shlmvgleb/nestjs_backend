import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class AddPromoToOrder {
  @ApiProperty({ description: 'uuid акции' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  promotionId: string;
}
