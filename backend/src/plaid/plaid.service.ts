import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import * as plaid from 'plaid';
import { UsersService } from 'users/users.service';
import { ItemsService } from 'items/items.service';
import * as moment from 'moment';
import { AccountsService } from 'accounts/accounts.service';
import { TransactionsService } from 'transactions/transactions.service';
import * as json from '../transactions/transactions.mock.json';
const last30 = () =>
    moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD');
const last2y = () =>
    moment()
        .subtract(2, 'years')
        .format('YYYY-MM-DD');

const endDate = moment().format('YYYY-MM-DD');

enum WebhookCode {
    INITIAL_UPDATE = 'INITIAL_UPDATE',
    HISTORICAL_UPDATE = 'HISTORICAL_UPDATE',
}
@Injectable()
export class PlaidService {
    private plaidClient: plaid.Client;

    constructor(
        private configService: ConfigService,
        private logger: Logger,
        private readonly itemsService: ItemsService,
        private readonly accountsService: AccountsService,
        private readonly transactionsService: TransactionsService,
        private readonly usersService: UsersService,
    ) {
        this.plaidClient = new plaid.Client(
            this.configService.get<string>('PLAID_CLIENT_ID'),
            this.configService.get<string>('PLAID_SECRET'),
            this.configService.get<string>('PLAID_PUBLIC_KEY'),
            plaid.environments.sandbox,
        );
        this.logger.setContext('PlaidService');
    }

    exchangePublicToken(publicToken: string) {
        return this.plaidClient.exchangePublicToken(publicToken);
    }

    async sandboxPublicTokenCreate() {
        this.logger.log('Creating fake item in plaid sandbox');
        try {
            return await this.plaidClient.sandboxPublicTokenCreate('ins_1', ['auth', 'transactions']);
        } catch (e) {
            return e;
        }
    }

    async handleTransactionsUpdate({ plaidItemId, webhookCode }) {
        const item = await this.itemsService.get(plaidItemId);
        const { plaidAccessToken, user } = item;
        let startDate = last30();
        switch (webhookCode) {
            case WebhookCode.HISTORICAL_UPDATE:
                startDate = last2y();
        }
        const { accounts, transactions } = await this.fetchTransactions({
            plaidAccessToken,
            startDate,
            endDate,
        });
        /** Create accounts and attach to item */
        item.accounts = await this.accountsService.create(accounts);
        await this.itemsService.update(item);
        /** Create transactions and attach to user */
        user.transactions = await this.transactionsService.create(transactions);
        await this.usersService.update(user);
        return user;
    }

    async fetchTransactions({ startDate, endDate, plaidAccessToken }) {
        try {
            let offset = 0;
            let transactionsToFetch = true;
            let resultData: {
                transactions: plaid.Transaction[];
                accounts: plaid.Account[];
            } = { transactions: [], accounts: [] };
            const batchSize = 100;
            /* eslint-disable no-await-in-loop */
            while (transactionsToFetch) {
                // fetch the transactions
                const options = {
                    count: batchSize,
                    offset,
                };

                this.logger.log(`Fetching transactions... ${plaidAccessToken}, ${startDate}, ${endDate}`);
                const { transactions, accounts } = await this.plaidClient.getTransactions(
                    plaidAccessToken,
                    startDate,
                    endDate,
                    options,
                );

                resultData = {
                    transactions: [...resultData.transactions, ...transactions],
                    accounts,
                };

                if (transactions.length === batchSize) {
                    offset += batchSize;
                } else {
                    transactionsToFetch = false;
                }
            }
            return resultData;
        } catch (e) {
            console.error(`Error fetching transactions: ${e.message}`);
            return { transactions: [], accounts: [] };
        }
    }

    getAccounts(accessToken: string) {
        return this.plaidClient.getAccounts(accessToken);
    }
    getCategories() {
        return this.plaidClient.getCategories();
    }
    getInstitutionById(id: string) {
        return this.plaidClient.getInstitutionById(id);
    }
}
