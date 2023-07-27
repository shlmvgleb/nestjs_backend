import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dtos/order.dto';
import { ConfirmCodeDTO } from './dtos/confirm-code.dto';
import { OrderByPhoneDTO } from './dtos/order-by-phone.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { OrderWithoutEager } from '../../utils/swagger-types/order-without-eager';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';

const routeName = 'order';

@ApiTags(routeName)
@Controller(routeName)
export class OrderController implements Pick<IBaseCRUDMethods, 'create' | 'findAll' | 'findOneOrThrow' | 'update'> {

  constructor(private orderService:OrderService) {}

  @Post('create')
  @ApiResponse({ description: 'Создание заказа, где подтверждение смс-кода зависит от конфигурации' })
  async create(@Body() dto:CreateOrderDTO) {
    return this.orderService.create(dto);
  }

  @Post('admin/create')
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ description: 'Создание заказа из админ панели без подтверждения смс-кода', type: Order })
  async straightCreateFromAdmin(@Body() dto: CreateOrderDTO) {
    return this.orderService.straightCreate(dto);
  }

  @Post('confirm')
  @ApiResponse({ description: 'Заказ создан', type: Order })
  async confirmSmsCode(@Body() dto: ConfirmCodeDTO) {
    return this.orderService.confirmCode(dto);
  }

  @Post('last')
  @ApiResponse({
    description: 'Последний заказ по номеру',
    type: OrderWithoutEager,
  })
  async getLastOrderByPhone(@Body() dto: OrderByPhoneDTO) {
    return this.orderService.getLastOrderByPhone(dto);
  }

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: [Order] })
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: OrderWithoutEager })
  async findOneOrThrow(@Param('id') id: string) {
    return this.orderService.findOneOrThrow(id);
  }

  @Patch()
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: Order })
  async update(@Body() dto: UpdateOrderDto) {
    return this.orderService.update(dto);
  }
}
