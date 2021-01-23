import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    public async getAll() {
        return await this.transactionsService.getAll();
    }

    @Get()
    public async getSummaryByUser(@Param() params) {
        const { userId } = params;
        return await this.transactionsService.getSummaryByUser(userId);
    }
}
