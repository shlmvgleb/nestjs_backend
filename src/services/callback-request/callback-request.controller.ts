import { CallbackRequestService } from './callback-request.service';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateCallbackRequestDTO } from './dtos/create-callback.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CallbackRequest } from './entities/callback-request.entity';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { UpdateCallbackDto } from './dtos/update-callback.dto';
import { CallbackQueryProperties } from './dtos/callback-query-properties';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';

const routeName = 'callback';

@ApiTags(routeName)
@Controller(routeName)
export class CallbackRequestController implements Pick<IBaseCRUDMethods, 'create' | 'findOneOrThrow' | 'findAll' | 'update'>  {

  constructor(private readonly callbackReqService: CallbackRequestService) {}

  @Post('create')
  @ApiResponse({ type: CallbackRequest })
  create(@Body() dto: CreateCallbackRequestDTO) {
    return this.callbackReqService.create(dto);
  }

  @Patch()
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: CallbackRequest })
  update(@Body() dto: UpdateCallbackDto) {
    return this.callbackReqService.update(dto);
  }

  @Get(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: CallbackRequest })
  findOneOrThrow(@Param('id') id: string) {
    return this.callbackReqService.findOneOrThrow(id);
  }

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: [CallbackRequest] })
  findAll(@Query() properties: CallbackQueryProperties) {
    return this.callbackReqService.findAll(properties);
  }
}
