import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlaidService } from 'plaid/plaid.service';
import { ItemsService } from './items.service';

interface ITokenExchange {
    publicToken: string;
    institutionId: string;
    userId: string;
}
@Controller('items')
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly plaidService: PlaidService,
    ) {}
    @Post('/')
    public async exchangeToken(@Body() item: ITokenExchange) {
        const { publicToken, institutionId, userId } = item;

        const {
            item_id: plaidItemId,
            access_token: plaidAccessToken,
        } = await this.plaidService.exchangePublicToken(publicToken);

        console.log(`ItemId: ${plaidItemId}`);
        console.log(`Item plaidAccessToken ${plaidAccessToken}`);

        const newItem = await this.itemsService.createItem({
            userId,
            institutionId,
            plaidItemId,
            plaidAccessToken,
        });

        return newItem;
    }

    @Post('/seed')
    public async seedFakeItem() {
        return await this.plaidService.sandboxPublicTokenCreate();
    }

    @Post('/clear')
    public async clearItems() {
        return await this.itemsService.clearItems();
    }

    // @Get('/:plaidItemId/accounts')
    // public async getAccounts(@Param() params) {
    //     const { plaidItemId } = params;
    //     return this.plaidService;
    // }
}
