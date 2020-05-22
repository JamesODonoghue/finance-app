import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ItemsModule } from 'items/items.module';
import { PlaidModule } from 'plaid/plaid.module';
import { TransactionsModule } from 'transactions/transactions.module';
import { AccountsModule } from 'accounts/accounts.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ItemsModule,
        PlaidModule,
        TransactionsModule,
        AccountsModule,
    ],
    providers: [UsersService],
    exports: [TypeOrmModule, UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
