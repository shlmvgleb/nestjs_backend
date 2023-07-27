import { BaseModel } from '../../../database/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';
import { Model } from 'objection';
import { Tokens } from './tokens.entity';

export class User extends BaseModel {
  static get tableName() {
    return 'user';
  }

  @ApiProperty()
  login: string;

  password: string;

  deviceId: string;

  phone: string;

  tokensId: string;

  tokens: Tokens;

  role: Role;

  static get relationMappings() {
    return {
      role: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'user.id',
          through: {
            from: 'userRole.userId',
            to: 'userRole.roleId',
          },
          to: 'role.id',
        },
      },
      tokens: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tokens,
        join: {
          from: 'user.tokensId',
          to: 'tokens.id',
        },
      },
    };
  }
}
