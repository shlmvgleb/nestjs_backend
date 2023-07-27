import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigurationService } from './configuration.service';

@Module({
  controllers: [ConfigController],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
