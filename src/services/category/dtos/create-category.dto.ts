import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Water', description: 'Название категории' })
  @IsString({ message: ValidationEnum.NotString })
  @IsNotEmpty({ message: ValidationEnum.NameNotEmpty })
  name: string;

  @ApiProperty({ description: 'Описание категории' })
  @IsString({ message: ValidationEnum.NotString })
  description: string;

  @ApiProperty({
    example:'some id from categories list',
    description: 'Родительская категория для данной',
    nullable: true,
  })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  parentId?: string;
}

