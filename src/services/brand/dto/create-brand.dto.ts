import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'Piligrim', description: 'Имя нового бренда' })
  @IsNotEmpty({ message: ValidationEnum.NameNotEmpty })
  @IsString({ message: ValidationEnum.NotString })
  name: string;

  @ApiProperty({ example: 'some uuid', description: 'Лого бренда' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  @IsOptional()
  fileId?: string;
}
