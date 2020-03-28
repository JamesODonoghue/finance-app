import { Controller, Get, Post, Body } from '@nestjs/common';
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
            item_id: itemId,
            access_token: accessToken,
        } = await this.plaidService.exchangePublicToken(publicToken);

        const newItem = await this.itemsService.createItem({
            userId,
            institutionId,
            itemId,
            accessToken,
        });

        console.log(newItem);

        return newItem;
    }
}
