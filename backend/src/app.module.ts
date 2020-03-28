import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { AccountsService } from './accounts/accounts.service';
import { AccountsModule } from './accounts/accounts.module';
@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthModule,
        UsersModule,
        ItemsModule,
        AccountsModule,
    ],
    providers: [AccountsService],
})
export class AppModule {}
