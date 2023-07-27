import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class AuthDto {
  @ApiProperty()
  @IsString({ message: ValidationEnum.NotString })
  login: string;

  @ApiProperty()
  @IsString({ message: ValidationEnum.NotString })
  password: string;

  @ApiProperty()
  @IsUUID('all', { message: ValidationEnum.NotUUID })
  deviceId: string;
}
