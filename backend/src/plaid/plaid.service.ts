import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as plaid from 'plaid';

@Injectable()
export class PlaidService {
    private plaidClient: plaid.Client;

    constructor(private configService: ConfigService) {
        this.plaidClient = new plaid.Client(
            this.configService.get<string>('PLAID_CLIENT_ID'),
            this.configService.get<string>('PLAID_SECRET'),
            this.configService.get<string>('PLAID_PUBLIC_KEY'),
            plaid.environments.sandbox,
        );
    }

    exchangePublicToken(public_token: string) {
        console.log(public_token);
        return this.plaidClient.exchangePublicToken(public_token);
    }

    // getAccounts(access_token: string) {
    //     return this.plaidClient.getAccounts(access_token);
    // }

    // getItems() {
    //     return this.itemRepository.find();
    // }

    // findByOneByToken(token: string): Promise<Item> {
    //     return this.itemRepository.findOne(token);
    // }
}
