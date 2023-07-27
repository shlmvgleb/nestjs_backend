import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '../../../database/base.model';

export class ConfigEntity extends BaseModel {
  static get tableName() {
    return 'configuration';
  }

  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  valueType: string;
}
