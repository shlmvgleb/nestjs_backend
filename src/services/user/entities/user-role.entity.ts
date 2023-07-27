import { BaseModel } from '../../../database/base.model';

export class UserRole extends BaseModel {
  static get tableName() {
    return 'user_role';
  }

  userId: string;

  roleId: string;
}
