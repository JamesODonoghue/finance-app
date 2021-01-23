import { User } from 'users/user.entity';

export class CreateItemDto {
    id: string;
    plaidAccessToken: string;
    user: User;
    institutionId: string;
    institutionName: string;
}
