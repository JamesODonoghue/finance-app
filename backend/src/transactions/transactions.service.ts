import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import * as plaid from 'plaid';
@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
    ) {}

    retrieveTransactionsByUser(userId: string) {
        return this.transactionRepo.find({ where: { userId: userId } });
    }

    saveTransactions(transactions: plaid.Transaction[], userId: string) {
        return this.transactionRepo.save(
            transactions.map((trn) => ({
                plaidTransactionId: trn.transaction_id,
                userId: userId,
                accountId: trn.account_id,
                category: trn.category[0],
                transactionType: trn.transaction_type,
                transactionDate: trn.date,
                transactionName: trn.name,
                amount: trn.amount,
                pending: trn.pending,
                accountOwner: trn.account_owner,
                isoCurrencyCode: trn.iso_currency_code,
                unofficialCurrencyCode: trn.unofficial_currency_code,
            })),
        );
    }
}
