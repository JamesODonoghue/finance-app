import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import moment = require('moment');
import { AppGateway } from 'app.gateway';
import { ItemsService } from 'items/items.service';

enum WebhookCode {
    INITIAL_UPDATE = 'INITIAL_UPDATE',
    HISTORICAL_UPDATE = 'HISTORICAL_UPDATE',
}
interface PlaidWebhookResponse {
    webhook_type: string;
    webhook_code: string;
    item_id: string;
    error;
    new_transactions: number;
}

@Controller('plaid')
export class PlaidController {
    constructor(
        private plaidService: PlaidService,
        private readonly messageGateway: AppGateway,
        private itemService: ItemsService,
    ) {}

    @Post('/webhook')
    public async webhook(@Body() webhook: PlaidWebhookResponse) {
        const { webhook_code: webhookCode, item_id: plaidItemId } = webhook;

        let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');

        let endDate = moment().format('YYYY-MM-DD');
        let item;

        switch (webhookCode) {
            case WebhookCode.INITIAL_UPDATE:
                console.log('Webhook received...');

                item = await this.itemService.retrieveItemByPlaidId(plaidItemId);

                this.plaidService.handleTransactionsUpdate({
                    plaidItemId,
                    startDate,
                    endDate,
                    item,
                });

                this.messageGateway.server.emit('INITIAL_UPDATE', {
                    plaidItemId,
                    userId: item.userId,
                });
            case WebhookCode.HISTORICAL_UPDATE:
                console.log('Webhook received...');
                startDate = moment().subtract(2, 'years').format('YYYY-MM-DD');
                endDate = moment().format('YYYY-MM-DD');

                item = await this.itemService.retrieveItemByPlaidId(plaidItemId);
                this.plaidService.handleTransactionsUpdate({
                    plaidItemId,
                    startDate,
                    endDate,
                    item,
                });

                this.messageGateway.server.emit('HISTORICAL_UPDATE', {
                    plaidItemId,
                    userId: item.userId,
                });
        }
    }

    @Get('/institutions/:instId')
    public async getInstitutionById(@Param() { instId }) {
        return await this.plaidService.getInstitutionById(instId);
    }
}
