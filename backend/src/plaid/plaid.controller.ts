import { CreateItemDto } from './create-item.dto';
import { PlaidService } from './plaid.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { AccountsResponse } from 'plaid';

@Controller('plaid')
export class PlaidController {
    constructor(private readonly plaidService: PlaidService) {}

    @Get('accounts')
    public async getAccounts(
        @Body() access_token: string,
    ): Promise<AccountsResponse> {
        return this.plaidService.getAccounts(access_token);
    }

    @Get('item')
    public async getAllItems() {
        return this.plaidService.getItems();
    }

    @Post('item')
    public async createItem(@Body() item: CreateItemDto) {
        console.log(item);
        let plaidItem = await this.plaidService.findByOneByToken(
            item.access_token,
        );

        if (!plaidItem) {
            let result = await this.plaidService.createItem(item);
            return {
                message: 'item not found. creating item',
                result,
            };
        } else {
            return {
                message: 'item found',
                plaidItem,
            };
        }
    }
}
