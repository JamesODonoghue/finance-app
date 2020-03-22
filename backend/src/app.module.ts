import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlaidModule } from './plaid/plaid.module';
@Module({
    imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, PlaidModule],
})
export class AppModule {}
