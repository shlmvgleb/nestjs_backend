import { Controller, Get } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BalanceData } from './types/balance.data';

const routeName = 'sms';

@ApiTags(routeName)
@Controller(routeName)
export class SmsController {
  constructor(private smsService: SmsService) {}

  @ApiResponse({ type: BalanceData })
  @Get('balance')
  getBalance() {
    return this.smsService.getBalance();
  }
}
