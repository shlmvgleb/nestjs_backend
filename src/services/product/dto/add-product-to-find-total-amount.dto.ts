import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Max, Min } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class AddProductToFindTotalAmountDto {
  @ApiProperty({ example: 'id from your items list' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  productId: string;

  @ApiProperty({ example: 5, description: 'Count of items' })
  @IsInt({ message: ValidationEnum.NotInt })
  @Min(1, { message: ValidationEnum.NotMin })
  @Max(100, { message: ValidationEnum.NotMax })
  count: number;
}
