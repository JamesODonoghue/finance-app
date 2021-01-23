import { User } from 'users/user.entity';
import { Account } from 'accounts/account.entity';

export class CreateTransactionDto {
    id: string;
    account: Account;
    category: string;
    subcategory: string;
    transactionType: string;
    transactionName: string;
    amount: string;
    isoCurrencyCode: string;
    unofficialCurrencyCode: string;
    transactionDate: string;
    pending: string;
    accountOwner: string;
}
