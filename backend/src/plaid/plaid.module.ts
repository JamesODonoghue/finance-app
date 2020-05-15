import { ConfigService } from '@nestjs/config';
import { Module, Logger, forwardRef } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';
import { ItemsModule } from 'items/items.module';
import { AccountsModule } from 'accounts/accounts.module';

@Module({
    imports: [forwardRef(() => ItemsModule), AccountsModule],
    providers: [PlaidService, ConfigService, Logger],
    exports: [PlaidService],
    controllers: [PlaidController],
})
export class PlaidModule {}
