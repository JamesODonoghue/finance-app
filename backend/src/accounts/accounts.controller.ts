import { Controller, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Post('/clear')
    public async clear() {
        return await this.accountsService.clear();
    }
}
