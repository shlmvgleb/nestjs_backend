import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { Tokens } from './types/tokens';
import { RefreshDto } from './dtos/refresh.dto';
import { AccessToken } from './types/access-token';

const routeName = 'auth';

@ApiTags(routeName)
@Controller(routeName)
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('sign-in')
  @ApiResponse({ type: Tokens })
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth()
  @ApiResponse({ type: User })
  logout() {
    return this.authService.logout();
  }

  @Post('refresh')
  @ApiBearerAuth()
  @ApiResponse({ type: AccessToken })
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }
}
