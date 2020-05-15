import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import * as plaid from 'plaid';
import { ItemsService } from 'items/items.service';
import { AccountsService } from 'accounts/accounts.service';

@Injectable()
export class PlaidService {
    private plaidClient: plaid.Client;

    constructor(
        private configService: ConfigService,
        private logger: Logger,
        private itemService: ItemsService,
        private accountsService: AccountsService,
    ) {
        this.plaidClient = new plaid.Client(
            this.configService.get<string>('PLAID_CLIENT_ID'),
            this.configService.get<string>('PLAID_SECRET'),
            this.configService.get<string>('PLAID_PUBLIC_KEY'),
            plaid.environments.sandbox,
        );
        this.logger.setContext('PlaidService');
    }

    exchangePublicToken(public_token: string) {
        return this.plaidClient.exchangePublicToken(public_token);
    }

    async sandboxPublicTokenCreate() {
        this.logger.log('Creating fake item in plaid sandbox');
        try {
            return await this.plaidClient.sandboxPublicTokenCreate('ins_1', [
                'auth',
                'transactions',
            ]);
        } catch (e) {
            return e;
        }
    }

    async handleTransactionsUpdate({ plaidItemId, startDate, endDate }) {
        const {
            transactions: incomingTransactions,
            accounts,
        } = await this.fetchTransactions({ plaidItemId, startDate, endDate });

        return this.accountsService.createAccounts(
            accounts.map(acc => ({
                itemId: plaidItemId,
                plaidAccountId: acc.account_id,
                name: acc.name,
                mask: acc.mask,
                official_name: acc.official_name,
                currentBalance: acc.balances.current,
                availableBalance: acc.balances.available,
                isoCurrencyCode: acc.balances.iso_currency_code,
                unofficialCurrencyCode: acc.balances.unofficial_currency_code,
                type: acc.type,
                subtype: acc.subtype,
            })),
        );
    }

    async fetchTransactions({ plaidItemId, startDate, endDate }) {
        try {
            const {
                accessToken,
            } = await this.itemService.retrieveItemByPlaidId(plaidItemId);

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
                const {
                    transactions,
                    accounts,
                } = await this.plaidClient.getTransactions(
                    accessToken,
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

    getAccounts(access_token: string) {
        return this.plaidClient.getAccounts(access_token);
    }

    getInstitutionById(id: string) {
        return this.plaidClient.getInstitutionById(id);
    }

    // getItems() {
    //     return this.itemRepository.find();
    // }

    // findByOneByToken(token: string): Promise<Item> {
    //     return this.itemRepository.findOne(token);
    // }
}
