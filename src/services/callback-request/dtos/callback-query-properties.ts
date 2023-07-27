import { ApiProperty } from '@nestjs/swagger';
import { CallbackReqStatusEnum } from '../../../utils/enums/callback-req-status.enum';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class CallbackQueryProperties {
  @ApiProperty({ description: 'Сортировка по статусу', enum: CallbackReqStatusEnum, required: false })
  @IsEnum(CallbackReqStatusEnum, { message: ValidationEnum.NotCallbackStatus })
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Сортировка по номеру', required: false })
  @IsPhoneNumber('RU', { message: ValidationEnum.IncorrectPhoneNumber })
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Сортировка по ФИО', required: false })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  fullName?: string;

  @ApiProperty({ required: false, description: 'Источник запроса на обратный звонок' })
  @IsString({ message: ValidationEnum.NotString })
  @IsOptional()
  metaData?: string;
}
