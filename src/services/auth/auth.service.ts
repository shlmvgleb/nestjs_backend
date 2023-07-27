import { BaseService } from '../../utils/types/base.service';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from './config/jwt.config';
import { AuthDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload';
import { Injectable, Scope } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Context } from '../../utils/decorators/context.decorator';
import { UnauthorizedException } from '../../utils/exceptions/unauthorized.exception';
import { IncorrectUserDataException } from '../../utils/exceptions/incorrect-user-data.exception';
import { Tokens } from './types/tokens';
import { RefreshDto } from './dtos/refresh.dto';
import { AccessToken } from './types/access-token';
import { UserRole } from '../user/entities/user-role.entity';
import { Role } from '../user/entities/role.entity';


@Injectable({ scope: Scope.REQUEST })
export class AuthService extends BaseService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }


  async signIn(dto: AuthDto): Promise<Tokens> {
    const user = await this.userService.findOneByLogin(dto.login);

    if (!user) {
      throw new IncorrectUserDataException();
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new IncorrectUserDataException();
    }

    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await this.userService.update({
      id: user.id,
      refreshToken: refreshTokenHash,
      deviceId: dto.deviceId,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }


  @Context()
  async logout() {
    return this.userService.update({ id: this.ctx.user.id, refreshToken: null, deviceId: null });
  }


  async refresh(dto: RefreshDto): Promise<AccessToken> {
    const payload = await this.validateRefreshToken(dto.refreshToken);
    const user = await this.userService.findOneOrThrow(payload.id);
    const tokens = await user.$relatedQuery('tokens');
    const isMatch = tokens ? await bcrypt.compare(dto.refreshToken, tokens.refreshToken) : false;

    if (!isMatch || dto.deviceId !== user.deviceId) {
      throw new UnauthorizedException();
    }

    const { accessToken } = await this.generateTokens(payload.id);
    return {
      accessToken: accessToken,
    };
  }


  async validateAccessToken(token: string): Promise<JwtPayload> {
    const config = this.configService.get<JwtConfig>('jwt');
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: config.accessSecret,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async validateRefreshToken(token: string): Promise<JwtPayload> {
    const config = this.configService.get<JwtConfig>('jwt');
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: config.refreshSecret,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }


  async generateTokens(userId: string): Promise<Tokens> {
    const user = await this.userService.findOneOrThrow(userId);
    const config = this.configService.get<JwtConfig>('jwt');
    const userRole = await UserRole.query().where({ userId: user.id });
    const roles = await Role.query().findByIds(userRole.map( el => el.roleId));
    const payload: JwtPayload = {
      login: user.login,
      id: user.id,
      roles: roles.map(el => el.name),
    };


    let [access, refresh] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: config.accessExp,
        secret: config.accessSecret,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: config.refreshExp,
        secret: config.refreshSecret,
      }),
    ]);

    return {
      accessToken: access,
      refreshToken: refresh,
    };
  }
}
