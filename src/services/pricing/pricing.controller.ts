import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { PricingService } from './pricing.service';
import { PricingQueryProperties } from './dtos/pricing-query.properties';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePricingDto } from './dtos/update.pricing.dto';
import { Pricing } from './entities/pricing.entity';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';
import { CreatePricingDto } from './dtos/create-pricing.dto';
import { DeletePricingDto } from './dtos/delete.pricing.dto';

const routeName = 'pricing';

@ApiTags(routeName)
@Controller(routeName)
export class PricingController implements Pick<IBaseCRUDMethods, 'create' | 'update' | 'findAll' | 'findOneOrThrow' | 'restore'> {
  constructor(private pricingService: PricingService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({
    type: [Pricing],
    description: 'Можно создать только больший диапазон, например: если есть табличка с диапазоном от 1 до 5, то ' +
      'диапазон от 2 до 4 создать нельзя',
  })
  create(@Body() dto: CreatePricingDto) {
    return this.pricingService.create(dto);
  }

  @Get()
  @ApiResponse({ type: [Pricing] })
  findAll(@Query() properties: PricingQueryProperties) {
    return this.pricingService.findAll(properties);
  }

  @Get(':id')
  @ApiResponse({ type: Pricing })
  findOneOrThrow(@Param('id') id: string) {
    return this.pricingService.findOneOrThrow(id);
  }

  @Patch()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: [Pricing] })
  update(@Body() dto: UpdatePricingDto) {
    return this.pricingService.update(dto);
  }

  @Delete()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: [Pricing] })
  remove(@Body() dto: DeletePricingDto) {
    return this.pricingService.remove(dto);
  }

  @Post('restore/:id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Pricing })
  restore(@Param('id') id: string) {
    return this.pricingService.restore(id);
  }

}
