import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class RefreshDto {
  @ApiProperty()
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  deviceId: string;

  @ApiProperty()
  @IsJWT({ message: ValidationEnum.NotJWT })
  refreshToken: string;
}
