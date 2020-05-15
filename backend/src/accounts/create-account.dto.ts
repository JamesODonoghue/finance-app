export class CreateAccountDto {
    plaidAccountId: string;
    itemId: string;
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
