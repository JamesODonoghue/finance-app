import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './create-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    createAccounts(accounts: CreateAccountDto[]): Promise<Account[]> {
        return this.accountRepository.save(accounts);
    }

    clearAccounts() {
        return this.accountRepository.manager.clear(Account);
    }
}
