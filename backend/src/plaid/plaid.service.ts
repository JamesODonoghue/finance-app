import { ConfigService } from '@nestjs/config';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as plaid from 'plaid';

@Injectable()
export class PlaidService {
    private plaidClient: plaid.Client;

    constructor(
        @InjectRepository(Item) private itemRepository: Repository<Item>,
        private configService: ConfigService,
    ) {
        this.plaidClient = new plaid.Client(
            this.configService.get<string>('PLAID_CLIENT_ID'),
            this.configService.get<string>('PLAID_SECRET'),
            this.configService.get<string>('PLAID_PUBLIC_KEY'),
            plaid.environments.sandbox,
        );
    }

    getAccounts(access_token: string) {
        return this.plaidClient.getAccounts(access_token);
    }

    getItems() {
        return this.itemRepository.find();
    }

    findByOneByToken(token: string): Promise<Item> {
        return this.itemRepository.findOne(token);
    }

    createItem(item: CreateItemDto): Promise<Item> {
        return this.itemRepository.save({
            ...item,
        });
    }

    exchangePublicToken(public_token: string) {
        console.log(public_token);
        return this.plaidClient.exchangePublicToken(public_token);
    }
}
