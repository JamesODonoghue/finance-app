import { ConfigService } from '@nestjs/config';
import { Module, Logger, forwardRef } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';
import { ItemsModule } from 'items/items.module';
import { AccountsModule } from 'accounts/accounts.module';
import { AppGateway } from 'app.gateway';
import { TransactionsModule } from 'transactions/transactions.module';
import { UsersModule } from 'users/users.module';

@Module({
    imports: [ItemsModule, AccountsModule, TransactionsModule, UsersModule],
    providers: [PlaidService, ConfigService, Logger, AppGateway],
    exports: [PlaidService],
    controllers: [PlaidController],
})
export class PlaidModule {}
