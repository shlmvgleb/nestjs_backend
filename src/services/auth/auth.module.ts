import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from './config/jwt.config';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<JwtConfig>('jwt');
        return {
          secret: config.accessSecret,
        };
      },
    }),
    UserModule,
  ],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
