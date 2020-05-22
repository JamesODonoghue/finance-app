import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PlaidModule } from './plaid.module';
import * as plaid from 'plaid';
import { PlaidService } from './plaid.service';
import moment = require('moment');

enum WebhookCode {
    INITIAL_UPDATE = 'INITIAL_UPDATE',
}
interface PlaidWebhookResponse {
    webhook_type: string;
    webhook_code: string;
    item_id: string;
    error: any;
    new_transactions: number;
}

@Controller('plaid')
export class PlaidController {
    constructor(private plaidService: PlaidService) {}

    @Post('/webhook')
    public async webhook(@Body() webhook: PlaidWebhookResponse) {
        const {
            webhook_code: webhookCode,
            item_id: plaidItemId,
            new_transactions: newTransactions,
        } = webhook;

        switch (webhookCode) {
            case WebhookCode.INITIAL_UPDATE:
                const startDate = moment()
                    .subtract(30, 'days')
                    .format('YYYY-MM-DD');
                const endDate = moment().format('YYYY-MM-DD');
                this.plaidService.handleTransactionsUpdate({
                    plaidItemId,
                    startDate,
                    endDate,
                });
        }
    }

    @Get('/institutions/:instId')
    public async getInstitutionById(@Param() { instId }) {
        return await this.plaidService.getInstitutionById(instId);
    }
}
