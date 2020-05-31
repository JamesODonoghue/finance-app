import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';
import { NgrokModule } from 'ngrok/ngrok.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(),
        AuthModule,
        UsersModule,
        ItemsModule,
        AccountsModule,
        TransactionsModule,
        NgrokModule,
    ],
})
export class AppModule {}
