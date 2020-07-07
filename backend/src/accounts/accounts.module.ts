import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountsController } from './accounts.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AccountsService],
    controllers: [AccountsController],
    exports: [AccountsService],
})
export class AccountsModule {}
