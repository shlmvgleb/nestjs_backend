import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { Brand } from './entities/brand.entity';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';

const routeName = 'brand';

@ApiTags(routeName)
@Controller(routeName)
export class BrandController implements IBaseCRUDMethods {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Brand })
  create(@Body() dto: CreateBrandDto) {
    return this.brandService.create(dto);
  }

  @Get()
  @ApiResponse({ type: [Brand] })
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Brand })
  findOneOrThrow(@Param('id') id: string) {
    return this.brandService.findOneOrThrow(id);
  }

  @Patch()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Brand })
  update(@Body() dto: UpdateBrandDto) {
    return this.brandService.update(dto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Brand })
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }

  @Post('restore/:id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: Brand })
  restore(@Param('id') id: string) {
    return this.brandService.restore(id);
  }
}
