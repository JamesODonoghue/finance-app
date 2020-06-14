import { Account } from './account';
export interface Item {
    plaidAccessToken: string;
    institutionId: string;
    plaidItemId: string;
    userId: string;
    institutionName: string;
    accounts: Account[];
}
