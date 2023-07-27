import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @ApiProperty({ description: 'uuid of some brand' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;
}
