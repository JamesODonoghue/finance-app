import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Module({
  providers: [AccountsService]
})
export class AccountsModule {}
