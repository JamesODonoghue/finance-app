export class CreateTransactionDto {
    userId: string;
    accountId: string;
    plaidTransactionId: string;
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
