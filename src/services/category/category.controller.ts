import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { CategoryWithoutEager } from '../../utils/swagger-types/category-wothout-eager';
import { Category } from './entities/category.entity';
import { CategoryQueryProperties } from './dtos/category-query.properties';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';

const routeName = 'category';

@ApiTags(routeName)
@Controller(routeName)
export class CategoryController implements IBaseCRUDMethods {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: CategoryWithoutEager })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({
    type: [Category],
    description: 'По дефолту сортирует все категории по полю priority (asc)',
  })
  findAllRecursive(@Query() properties?: CategoryQueryProperties) {
    return this.categoryService.findAllRecursive(properties);
  }

  @Get('flat')
  @ApiResponse({ type: [CategoryWithoutEager] })
  findAll(@Query() properties?: CategoryQueryProperties) {
    return this.categoryService.findAll(properties);
  }

  @Get(':id')
  @ApiResponse({ type: CategoryWithoutEager })
  findOneOrThrow(@Param('id') id: string) {
    return this.categoryService.findOneOrThrow(id);
  }

  @Patch()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: CategoryWithoutEager })
  update(@Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(dto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: CategoryWithoutEager })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Post('restore/:id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: CategoryWithoutEager })
  restore(@Param('id') id: string) {
    return this.categoryService.restore(id);
  }
}


