import { Model } from 'objection';
import { BaseModel } from '../../../database/base.model';
import { User } from './user.entity';

export class Tokens extends BaseModel {
  static get tableName() {
    return 'tokens';
  }

  refreshToken: string;

  user: User;

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'tokens.id',
          to: 'user.tokensId',
        },
      },
    };
  }
}
