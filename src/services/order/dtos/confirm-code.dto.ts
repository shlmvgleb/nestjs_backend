import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsJWT } from 'class-validator';
import { ValidationEnum } from '../../../utils/enums/validation.enum';

export class ConfirmCodeDTO {
  @ApiProperty({ example: 123456, description: 'Sms code' })
  @IsInt({ message: ValidationEnum.NotInt })
  code: number;

  @ApiProperty()
  @IsJWT({ message: ValidationEnum.NotJWT })
  token: string;
}
