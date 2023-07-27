import { Injectable, Logger } from '@nestjs/common';
import { UpdateConfigurationDto } from './dto/update.configuration.dto';
import { CreateConfigurationDto } from './dto/create.configuration';
import { ConfigEntity } from './entities/config.entity';
import { getOrThrow } from '../../utils/helpers/getter';
import { ConfigByIdNotFoundException } from '../../utils/exceptions/config-by-id-not-found.exception';
import { CreateConfigException } from '../../utils/exceptions/create.config.exception';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { UpdateConfigException } from '../../utils/exceptions/update-config.exception';
import { ConfigByKeyNotFoundException } from '../../utils/exceptions/config-by-key-not-found.exception';

@Injectable()
export class ConfigurationService implements IBaseCRUDMethods {
  private readonly logger = new Logger(ConfigurationService.name);

  async findAll() {
    return ConfigEntity.query();
  }

  async findOneOrThrow(id: string) {
    return getOrThrow(
      async () => ConfigEntity.query().findById(id),
      new ConfigByIdNotFoundException(id),
    );
  }

  async findOneByKeyOrThrow(key: string) {
    return getOrThrow(
      async () => ConfigEntity.query().findOne({ key: key }),
      new ConfigByKeyNotFoundException(key),
    );
  }

  async update(dto: UpdateConfigurationDto) {
    const config = await this.findOneOrThrow(dto.id);
    try {
      return await ConfigEntity.transaction(async trx => {
        return config.$query(trx).patch(dto).returning('*');
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new UpdateConfigException();
    }
  }

  async create(dto: CreateConfigurationDto) {
    try {
      return await ConfigEntity.transaction(async trx => {
        return ConfigEntity.query(trx).insert(dto);
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new CreateConfigException();
    }
  }

  async remove(id: string) {
    const config = await this.findOneOrThrow(id);
    return config.$query().delete().returning('*');
  }

  async removeByKey(key: string) {
    const config = await this.findOneByKeyOrThrow(key);
    return config.$query().delete().returning('*');
  }
}
