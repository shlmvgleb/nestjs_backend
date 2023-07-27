import { BaseModel } from '../../../database/base.model';
import { User } from './user.entity';
import { Model } from 'objection';

export class Role extends BaseModel {
  static get tableName() {
    return 'role';
  }

  name: string;

  user: User;

  static get relationMappings() {
    return {
      user: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'role.id',
          through: {
            from: 'userRole.roleId',
            to: 'userRole.userId',
          },
          to: 'user.id',
        },
      },
    };
  }
}
