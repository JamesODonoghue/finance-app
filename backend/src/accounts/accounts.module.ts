import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountsController } from './accounts.controller';
import { Item } from 'items/item.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        TypeOrmModule.forFeature([Item]),
    ],
    providers: [AccountsService],
    controllers: [AccountsController],
    exports: [AccountsService],
})
export class AccountsModule {}
