import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ItemsService } from 'items/items.service';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly itemsService: ItemsService) {}

    @Get('/:id')
    public async getUserById(@Param() params) {
        const { id } = params;
        return this.usersService.findById(id);
    }
    @Get('/:id/items')
    public async getItemsByUser(@Param() params) {
        const { id } = params;
        return this.usersService.getItems(id);
    }
    @Get('/:id/accounts')
    public async getAccountsByUser(@Param() params) {
        const { id } = params;
        const { accounts } = await this.itemsService.getAll(id);
        return accounts;
    }
    @Get('/:id/transactions')
    public getTransactionsByUser(@Param() params) {
        const { id } = params;
        return this.usersService.getTransactions(id);
    }
}
