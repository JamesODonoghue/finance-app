import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import * as plaid from 'plaid';
import { ItemsService } from 'items/items.service';
import { AccountsService } from 'accounts/accounts.service';
import { TransactionsService } from 'transactions/transactions.service';

@Injectable()
export class PlaidService {
    private plaidClient: plaid.Client;

    constructor(
        private configService: ConfigService,
        private logger: Logger,
        private itemService: ItemsService,
        private accountsService: AccountsService,
        private transactionsService: TransactionsService,
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

    async handleTransactionsUpdate({ plaidItemId, startDate, endDate, item }) {
        const { transactions: incomingTransactions, accounts } = await this.fetchTransactions({
            plaidItemId,
            startDate,
            endDate,
        });

        console.log(`Item: ${item}`);
        item.accounts = await this.accountsService.createAccounts(
            accounts.map((acc) => ({
                plaidItemId: plaidItemId,
                plaidAccountId: acc.account_id,
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

        await this.itemService.updateItem(item);
        await this.transactionsService.saveTransactions(incomingTransactions, item.userId);

        return this.itemService.updateItem(item);
    }

    async fetchTransactions({ plaidItemId, startDate, endDate }) {
        try {
            const { plaidAccessToken } = await this.itemService.retrieveItemByPlaidId(plaidItemId);

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

    getInstitutionById(id: string) {
        return this.plaidClient.getInstitutionById(id);
    }
}
