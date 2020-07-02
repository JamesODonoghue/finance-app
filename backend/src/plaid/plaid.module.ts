import { ConfigService } from '@nestjs/config';
import { Module, Logger, forwardRef } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';
import { ItemsModule } from 'items/items.module';
import { AccountsModule } from 'accounts/accounts.module';
import { AppGateway } from 'app.gateway';
import { TransactionsModule } from 'transactions/transactions.module';

@Module({
    imports: [forwardRef(() => ItemsModule), AccountsModule, TransactionsModule],
    providers: [PlaidService, ConfigService, Logger, AppGateway],
    exports: [PlaidService],
    controllers: [PlaidController],
})
export class PlaidModule {}
