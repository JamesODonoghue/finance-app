import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './create-account.dto';
import { Item } from 'items/item.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
    ) {}

    createAccounts(accounts: CreateAccountDto[]): Promise<Account[]> {
        return this.accountRepository.save(accounts);
    }

    getAccountsByUser(userId: string) {}

    clearAccounts() {
        return this.accountRepository.manager.clear(Account);
    }
}
