import { Controller, Post, Body } from '@nestjs/common';
import { PlaidService } from 'plaid/plaid.service';
import { ItemsService } from './items.service';

interface TokenExchange {
    publicToken: string;
    userId: string;
    institutionId: string;
    institutionName: string;
}
@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService, private readonly plaidService: PlaidService) {}
    @Post('/')
    public async exchangeToken(@Body() item: TokenExchange) {
        const { publicToken, institutionId, institutionName, userId } = item;

        /**
         * Retrieve the accessToken for the created item
         * */
        const { item_id: plaidItemId, access_token: plaidAccessToken } = await this.plaidService.exchangePublicToken(
            publicToken,
        );

        return await this.itemsService.createItem({
            userId,
            institutionId,
            institutionName,
            plaidItemId,
            plaidAccessToken,
        });
    }

    @Post('/seed')
    public async seedFakeItem() {
        return await this.plaidService.sandboxPublicTokenCreate();
    }

    @Post('/clear')
    public async clearItems() {
        return await this.itemsService.clearItems();
    }
}
