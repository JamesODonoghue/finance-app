import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import * as plaid from 'plaid';
import { AccountsService } from 'accounts/accounts.service';
@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
        private readonly accountsService: AccountsService,
        private readonly logger: Logger,
    ) {}

    /**
     * Map over the transactions, get the account, attach the account to the transaction
     * @param transactions
     */
    async create(transactions: plaid.Transaction[]) {
        let pendingTransactions = transactions.map(async transaction => {
            const account = await this.accountsService.findById(transaction.account_id);
            this.logger.log(`Creating transactions. AccountId: ${account.id}`);
            return await this.transactionRepo.save({
                id: transaction.transaction_id,
                category: transaction.category.join(','),
                account,
                transactionType: transaction.transaction_type,
                transactionDate: transaction.date,
                transactionName: transaction.name,
                transactionCode: transaction.transaction_code,
                amount: transaction.amount,
                pending: transaction.pending,
                accountOwner: transaction.account_owner,
                isoCurrencyCode: transaction.iso_currency_code,
                unofficialCurrencyCode: transaction.unofficial_currency_code,
            });
        });
        return await Promise.all(pendingTransactions);
    }

    async getAll() {
        return await this.transactionRepo.find({ relations: ['account', 'account.item', 'account.items.user'] });

        // return await this.transactionRepo
        //     .createQueryBuilder('transaction')
        //     .innerJoinAndSelect('transaction.account', 'account')
        //     .innerJoinAndSelect('account.item', 'item')
        //     .innerJoinAndSelect('item.user', 'user')
        //     .where('user.id = :userId', { userId: id })
        //     .getMany();
    }

    async getSummaryByUser(userId: string) {}
}
