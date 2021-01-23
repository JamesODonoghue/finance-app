import { Account } from './account';
export interface Item {
    plaidAccessToken: string;
    institutionId: string;
    id: string;
    userId: string;
    institutionName: string;
    accounts: Account[];
}
