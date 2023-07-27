import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Promotion } from './entities/promotion.entity';
import { PromoQueryProperties } from './dto/promo-query-properties';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';

const routeName = 'promotion';

@ApiTags(routeName)
@Controller(routeName)
export class PromotionController implements IBaseCRUDMethods {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Promotion })
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Get()
  @ApiResponse({ type: [Promotion] })
  findAll(@Query() properties: PromoQueryProperties) {
    return this.promotionService.findAll(properties);
  }

  @Get(':id')
  @ApiResponse({ type: Promotion })
  findOneOrThrow(@Param('id') id: string) {
    return this.promotionService.findOneOrThrow(id);
  }

  @Patch()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Promotion })
  update(@Body() dto: UpdatePromotionDto) {
    return this.promotionService.update(dto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Promotion })
  remove(@Param('id') id: string) {
    return this.promotionService.remove(id);
  }

  @Post('restore/:id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Promotion })
  restore(@Param('id') id: string) {
    return this.promotionService.restore(id);
  }
}
