import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ description: 'uuid of some category', nullable: true })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;

  @ApiProperty({ description: 'uuid of some category', nullable: true })
  @IsInt({ message: ValidationEnum.NotInt })
  @IsOptional()
  priority?: number;
}

