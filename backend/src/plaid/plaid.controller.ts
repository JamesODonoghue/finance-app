import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import * as moment from 'moment';
import { AppGateway } from 'app.gateway';
import { ItemsService } from 'items/items.service';
import { AccountsService } from 'accounts/accounts.service';
import { TransactionsService } from 'transactions/transactions.service';

interface PlaidWebhookResponse {
    webhook_type: string;
    webhook_code: string;
    item_id: string;
    error: string;
    new_transactions: number;
}

@Controller('plaid')
export class PlaidController {
    constructor(
        private plaidService: PlaidService,
        private readonly messageGateway: AppGateway,
        private itemService: ItemsService,
        private accountService: AccountsService,
        private transactionService: TransactionsService,
        private logger: Logger,
    ) {}

    // @Post('/webhook')
    // public async webhook(@Body() webhook: PlaidWebhookResponse) {
    //     const { webhook_code: webhookCode, item_id: plaidItemId } = webhook;

    //     let startDate = last30();
    //     let item = await this.itemService.findByPlaidId(plaidItemId);
    //     const { plaidAccessToken, user } = item;

    //     switch (webhookCode) {
    //         case WebhookCode.INITIAL_UPDATE:
    //             console.log('Webhook received...');

    //             const { transactions, accounts } = await this.plaidService.fetchTransactions({
    //                 plaidItemId,
    //                 startDate,
    //                 endDate,
    //                 plaidAccessToken,
    //             });

    //             item.accounts = await this.accountService.create(accounts);
    //             await this.transactionService.create({ transactions, user });

    //             this.messageGateway.server.emit(WebhookCode.INITIAL_UPDATE, {
    //                 plaidItemId,
    //                 userId: user.id,
    //             });
    //         case WebhookCode.HISTORICAL_UPDATE:
    //             console.log('Webhook received...');
    //             startDate = last2y();
    //             this.plaidService.fetchTransactions({
    //                 plaidItemId,
    //                 startDate,
    //                 endDate,
    //                 plaidAccessToken,
    //             });

    //             this.messageGateway.server.emit(WebhookCode.HISTORICAL_UPDATE, {
    //                 plaidItemId,
    //                 userId: item.user.id,
    //             });
    //     }
    // }
    @Post('/webhook')
    public async webhook(@Body() webhook: PlaidWebhookResponse) {
        const { webhook_code: webhookCode, item_id: plaidItemId } = webhook;
        const { id } = await this.plaidService.handleTransactionsUpdate({ plaidItemId, webhookCode });

        this.messageGateway.server.emit(webhookCode, {
            plaidItemId,
            userId: id,
        });
    }

    @Get('/institutions/:instId')
    public async getInstitutionById(@Param() { instId }) {
        return await this.plaidService.getInstitutionById(instId);
    }
    @Get('/categories')
    public async getCategories() {
        return await this.plaidService.getCategories();
    }
}
