import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from 'items/items.service';

@Controller('users')
export class UsersController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get('/:userId')
    public async getUserById(@Param() userId: string) {
        console.log(userId);
    }
    @Get('/:userId/items')
    public async getItemsByUser(@Param() params) {
        const { userId } = params;
        return this.itemsService.retrieveItemsByUser(userId);
    }
}
