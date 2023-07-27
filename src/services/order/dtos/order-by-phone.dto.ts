import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class OrderByPhoneDTO {
  @ApiProperty({ description: 'Phone number' })
  @IsPhoneNumber('RU', { message: ValidationEnum.IncorrectPhoneNumber })
  phone: string;
}
