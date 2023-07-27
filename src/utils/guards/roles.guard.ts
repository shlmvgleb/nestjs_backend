import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../services/auth/auth.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { IncorrectUserRoleException } from '../exceptions/incorrect-user-role.exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const accessToken = authorization.split(' ')[1];
    const user = await this.authService.validateAccessToken(accessToken);
    request.user = user;

    if (!roles.some(el => user.roles.includes(el))) {
      throw new IncorrectUserRoleException();
    }

    return true;
  }
}
