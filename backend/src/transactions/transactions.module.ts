import { Module, Logger } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { AccountsModule } from 'accounts/accounts.module';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), AccountsModule],
    controllers: [TransactionsController],
    providers: [TransactionsService, Logger],
    exports: [TransactionsService],
})
export class TransactionsModule {}
