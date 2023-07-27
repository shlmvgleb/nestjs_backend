import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';
import { CallbackReqStatusEnum } from '../../../utils/enums/callback-req-status.enum';

export class UpdateCallbackDto {
  @ApiProperty({ description: 'Uuid of callback' })
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  id: string;

  @ApiProperty({ description: 'Callback status', enum: CallbackReqStatusEnum })
  @IsEnum(CallbackReqStatusEnum, { message: ValidationEnum.NotCallbackStatus })
  status: string;
}
