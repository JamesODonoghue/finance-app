export interface Account {
    plaidAccountId: string;
    plaidItemId: string;
    name: string;
    mask: string;
    official_name: string;
    currentBalance: number;
    availableBalance: number;
    isoCurrencyCode: string;
    unofficialCurrencyCode: string;
    type: string;
    subtype: string;
}
