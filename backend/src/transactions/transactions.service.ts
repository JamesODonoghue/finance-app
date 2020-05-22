import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import * as json from './transactions.mock.json';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
    ) {}

    retrieveTransactionsByUser(userId: string) {
        return json;

        // return this.transactionRepo.find({ where: { userId: userId } });
    }
}
