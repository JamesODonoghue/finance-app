import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import * as plaid from 'plaid';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    async getAll() {
        return await this.accountRepository.find({ relations: ['item', 'transactions'] });
    }

    create(accounts: plaid.Account[]): Promise<Account[]> {
        return this.accountRepository.save(
            accounts.map(acc => ({
                id: acc.account_id,
                name: acc.name,
                mask: acc.mask,
                officialName: acc.official_name,
                currentBalance: acc.balances.current,
                availableBalance: acc.balances.available,
                isoCurrencyCode: acc.balances.iso_currency_code,
                unofficialCurrencyCode: acc.balances.unofficial_currency_code,
                type: acc.type,
                subtype: acc.subtype,
            })),
        );
    }

    findById(accountId) {
        return this.accountRepository.findOne(accountId, { relations: ['transactions'] });
    }

    clear() {
        return this.accountRepository.manager.clear(Account);
    }
}
