export interface Transaction {
    userId: string;
    accountId: string;
    plaidTransactionId: string;
    plaidCategoryId: string;
    category: string;
    subcategory: string;
    transactionType: string;
    transactionName: string;
    amount: number;
    isoCurrencyCode: string;
    unofficialCurrencyCode: string;
    transactionDate: string;
    pending: boolean;
    accountOwner: string;
}
