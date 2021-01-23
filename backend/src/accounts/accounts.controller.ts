import { Controller, Post, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    public async getAll() {
        return await this.accountsService.getAll();
    }
    @Post('/clear')
    public async clear() {
        return await this.accountsService.clear();
    }
}
