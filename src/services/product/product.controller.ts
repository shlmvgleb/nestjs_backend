import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsQueryProperties } from './dto/find-products-query.properties';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindTotalAmountDto } from './dto/products-to-calculate-price.dto';
import { Product } from './entities/product.entity';
import { ProductsWithTotalPrice } from './types/products-with-price.interface';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';
import { ProductWithoutEager } from '../../utils/swagger-types/product-without-eager';

const routeName = 'product';

@ApiTags(routeName)
@Controller(routeName)
export class ProductController implements IBaseCRUDMethods {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type:  ProductWithoutEager })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  @ApiResponse({ type: [Product] })
  findAll(@Query() properties: FindProductsQueryProperties) {
    return this.productService.findAll(properties);
  }


  @Get('price')
  @ApiResponse({ type: ProductsWithTotalPrice })
  findTotalAmount(@Body() dto: FindTotalAmountDto) {
    return this.productService.findTotalAmount(dto);
  }

  @Get(':id')
  @ApiResponse({ type: Product })
  findOneOrThrow(@Param('id') id: string) {
    return this.productService.findOneOrThrow(id);
  }

  @Patch()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: ProductWithoutEager })
  update(@Body() dto: UpdateProductDto) {
    return this.productService.update(dto);
  }

  @Post('restore/:id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: ProductWithoutEager })
  restore(@Param('id') id: string) {
    return this.productService.restore(id);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: ProductWithoutEager })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
