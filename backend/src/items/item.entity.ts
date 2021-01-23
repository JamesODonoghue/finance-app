import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Account } from 'accounts/account.entity';
import { User } from 'users/user.entity';

@Entity()
export class Item {
    @PrimaryColumn()
    id: string;
    @Column()
    plaidAccessToken: string;
    @OneToMany(
        () => Account,
        account => account.item,
    )
    accounts: Account[];
    @ManyToOne(
        () => User,
        user => user.items,
    )
    user: User;
    @Column({ nullable: true })
    institutionId?: string;
    @Column({ nullable: true })
    institutionName?: string;
}
