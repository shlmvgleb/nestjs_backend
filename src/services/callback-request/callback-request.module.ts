import { Module } from '@nestjs/common';
import { CallbackRequestService } from './callback-request.service';
import { CallbackRequestController } from './callback-request.controller';


@Module({
  controllers: [CallbackRequestController],
  providers: [CallbackRequestService],
  exports: [CallbackRequestService],
})
export class CallbackRequestModule {}
