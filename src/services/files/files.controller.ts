import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreateFileDto } from './dto/create.file.dto';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { File } from './entities/file.entity';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';
import { FormDataRequest } from 'nestjs-form-data';

const routeName = 'file';

@ApiTags(routeName)
@Controller(routeName)
export class FilesController implements IBaseCRUDMethods {
  constructor(private fileService: FilesService) {}

  @Get()
  @ApiResponse({ type: [File] })
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: File })
  findOneOrThrow(@Param('id') id: string) {
    return this.fileService.findOneOrThrow(id);
  }

  @Post()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: File })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFileDto })
  @FormDataRequest()
  create(@Body() dto: CreateFileDto) {
    return this.fileService.create(dto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: File })
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }

  @Post(':id')
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: File })
  restore(@Param('id') id: string) {
    return this.fileService.restore(id);
  }


  @Patch()
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateFileDto })
  @FormDataRequest()
  update(@Body() dto: UpdateFileDto) {
    return this.fileService.update(dto);
  }

}
