import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { RoleEnum } from '../../utils/enums/role.enum';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { Roles } from '../../utils/decorators/roles.decorator';
import { CreateConfigurationDto } from './dto/create.configuration';
import { UpdateConfigurationDto } from './dto/update.configuration.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigEntity } from './entities/config.entity';

const routeName = 'configuration';

@ApiTags(routeName)
@Controller(routeName)
export class ConfigController implements IBaseCRUDMethods {
  constructor(private configurationService: ConfigurationService) {}

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: [ConfigEntity] })
  async findAll() {
    return this.configurationService.findAll();
  }

  @Get('find-by-id/:id')
  @ApiResponse({ type: ConfigEntity })
  async findOneOrThrow(@Param('id') id: string) {
    return this.configurationService.findOneOrThrow(id);
  }

  @Get(':key')
  @ApiResponse({ type: ConfigEntity })
  async findOneByKeyOrThrow(@Param('key') key: string) {
    return this.configurationService.findOneByKeyOrThrow(key);
  }

  @Post()
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: ConfigEntity })
  async create(@Body() dto: CreateConfigurationDto) {
    return this.configurationService.create(dto);
  }

  @Patch()
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: ConfigEntity })
  async update(@Body() dto: UpdateConfigurationDto) {
    return this.configurationService.update(dto);
  }

  @Delete(':key')
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: ConfigEntity })
  async removeByKey(@Param('key') key: string) {
    return this.configurationService.removeByKey(key);
  }

  @Delete('remove-by-id/:id')
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: ConfigEntity })
  async remove(@Param('id') id: string) {
    return this.configurationService.remove(id);
  }
}
