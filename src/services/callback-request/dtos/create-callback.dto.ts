import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class CreateCallbackRequestDTO{
  @ApiProperty({ description: 'Phone number' })
  @IsPhoneNumber('RU', { message: ValidationEnum.IncorrectPhoneNumber })
  phone: string;

  @ApiProperty({ description: 'user\'s full name', nullable: true })
  @IsString({ message: ValidationEnum.NotString })
  fullName: string;

  @ApiProperty({ description: 'Callback request meta_data', nullable: true })
  @IsOptional()
  metaData?: string;
}
