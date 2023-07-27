import { Injectable } from '@nestjs/common';
import { getOrThrow } from '../../utils/helpers/getter';
import { User } from './entities/user.entity';
import { UserByIdNotFoundException } from '../../utils/exceptions/user-by-id-not-found.exception';
import { UpdateUserDto } from './dtos/update-user-dto';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';

const requiredUserFields = ['id', 'login', 'createdAt', 'updatedAt'];

@Injectable()
export class UserService implements Pick<IBaseCRUDMethods, 'update' | 'findOneOrThrow' | 'findAll' | 'remove'> {
  async findOneByLogin(login: string) {
    return User.query().findOne({ login: login });
  }


  async findOneOrThrow(id: string) {
    return getOrThrow(
      async () => User.query().findById(id),
      new UserByIdNotFoundException(id),
    );
  }


  async findAll() {
    return User.query().select(requiredUserFields);
  }


  async remove(id: string) {
    const user = await this.findOneOrThrow(id);
    return user.$query().delete().returning('*');
  }


  async update(dto: UpdateUserDto) {
    const user = await this.findOneOrThrow(dto.id);
    await user.$query().patch({
      deviceId: dto.deviceId,
    });
    await user.$relatedQuery('tokens').patch({
      refreshToken: dto.refreshToken,
    });
    return user.$query().select(requiredUserFields).withGraphFetched('role');
  }
}
