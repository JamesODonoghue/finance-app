export class CreateAccountDto {
    plaidAccountId: string;
    plaidItemId: string;
    name: string;
    mask: string;
    officialName: string;
    currentBalance: number;
    availableBalance: number;
    isoCurrencyCode: string;
    unofficialCurrencyCode: string;
    type: string;
    subtype: string;
}
