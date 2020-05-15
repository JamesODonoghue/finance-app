import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from 'items/items.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly userService: UsersService,
    ) {}

    @Get('/:userId')
    public async getUserById(@Param() userId: string) {
        return this.userService.findOneByThirdPartyId(userId);
    }
    @Get('/:userId/items')
    public async getItemsByUser(@Param() params) {
        const { userId } = params;
        return this.itemsService.retrieveItemsByUser(userId);
    }

    // @Get('/:userId/accounts')
    // public async getAccountsByUser(@Param() params) {
    //     const { userId } = params;
    //     let { access_token } = this.userService.findOneByThirdPartyId(userId);

    //     return this.plaidService.getAccounts(userId);
    // }
}
