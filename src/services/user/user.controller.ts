import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';
import { User } from './entities/user.entity';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';

const routeName = 'user';

@ApiTags(routeName)
@ApiBearerAuth()
@Controller(routeName)
export class UserController implements Pick<IBaseCRUDMethods, 'findAll' | 'remove'> {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiResponse({ type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  @ApiResponse({ type: User })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
