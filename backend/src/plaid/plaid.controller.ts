import { PlaidService } from './plaid.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('plaid')
export class PlaidController {
    constructor(private readonly plaidService: PlaidService) {}

    @Post('item')
    public async createItem(@Body() token: string) {
        console.log(token);
        let item = await this.plaidService.findByOneByToken(token);

        if (!item) {
            return {
                message: 'item not found. creating item',
                token,
            };
        } else {
            return {
                message: 'item found',
                token,
            };
        }
    }
}
