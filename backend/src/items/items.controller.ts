import { Controller, Post, Body } from '@nestjs/common';
import { PlaidService } from 'plaid/plaid.service';
import { ItemsService } from './items.service';
import { UsersService } from 'users/users.service';

interface TokenExchange {
    publicToken: string;
    userId: string;
    institutionId: string;
    institutionName: string;
}
@Controller('items')
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly plaidService: PlaidService,
        private readonly usersService: UsersService,
    ) {}
    @Post('/')
    public async exchangeToken(@Body() body: TokenExchange) {
        const { publicToken, institutionId, institutionName, userId } = body;
        /**
         * Retrieve the accessToken for the created item
         * */
        const { item_id: id, access_token: plaidAccessToken } = await this.plaidService.exchangePublicToken(
            publicToken,
        );

        let user = await this.usersService.findById(userId);
        return await this.itemsService.create({
            id,
            user,
            institutionId,
            institutionName,
            plaidAccessToken,
        });
    }

    @Post('/seed')
    public async seedFakeItem() {
        return await this.plaidService.sandboxPublicTokenCreate();
    }

    @Post('/clear')
    public async clear() {
        return await this.itemsService.clear();
    }
}
