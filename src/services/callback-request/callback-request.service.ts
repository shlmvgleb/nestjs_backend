import { Injectable, Logger } from '@nestjs/common';
import { CallbackRequest } from './entities/callback-request.entity';
import { CreateCallbackRequestDTO } from './dtos/create-callback.dto';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { UpdateCallbackDto } from './dtos/update-callback.dto';
import { getOrThrow } from '../../utils/helpers/getter';
import { CallbackByIdNotFoundException } from '../../utils/exceptions/callback-by-id-not-found.exception';
import { CallbackQueryProperties } from './dtos/callback-query-properties';
import { CallbackReqStatusEnum } from '../../utils/enums/callback-req-status.enum';

@Injectable()
export class CallbackRequestService implements Pick<IBaseCRUDMethods, 'create' | 'findOneOrThrow' | 'findAll' | 'update'> {
  private readonly logger = new Logger(CallbackRequestService.name);

  async create(dto: CreateCallbackRequestDTO) {
    const callback = await CallbackRequest.query().insert(dto);
    await callback.$relatedQuery('status').insert({
      name: CallbackReqStatusEnum.New,
    });
    return callback.$query().withGraphFetched('status');
  }

  async findOneOrThrow(id: string) {
    return getOrThrow(
      async () => CallbackRequest.query().findById(id).withGraphFetched('status'),
      new CallbackByIdNotFoundException(id),
    );
  }

  async update(dto: UpdateCallbackDto) {
    const callback = await this.findOneOrThrow(dto.id);
    await callback.$relatedQuery('status').patch({ name: dto.status });
    return callback.$query().withGraphFetched('status');
  }

  async findAll(properties: CallbackQueryProperties) {
    return CallbackRequest
      .query()
      .skipUndefined()
      .where('full_name', properties.fullName)
      .where('phone', properties.phone)
      .withGraphJoined('status')
      .whereExists(CallbackRequest.relatedQuery('status'))
      .where('status.name', properties.status);
  }
}
