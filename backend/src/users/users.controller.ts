import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from 'items/items.service';
import { UsersService } from './users.service';
import { TransactionsService } from 'transactions/transactions.service';
import { AccountsService } from 'accounts/accounts.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly userService: UsersService,
        private readonly transactionsService: TransactionsService,
        private readonly accountsService: AccountsService,
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
    @Get('/:userId/transactions')
    public async getTransactionsByUser(@Param() params) {
        const { userId } = params;
        return this.transactionsService.retrieveTransactionsByUser(userId);
    }
}
