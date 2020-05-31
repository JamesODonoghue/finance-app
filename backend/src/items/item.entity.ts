import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Account } from 'accounts/account.entity';

@Entity()
export class Item {
    @PrimaryColumn()
    plaidItemId: string;
    @Column()
    plaidAccessToken: string;
    @Column()
    userId: string;
    @Column({ nullable: true })
    institutionId?: string;
    @Column({ nullable: true })
    institutionName?: string;
    @OneToMany(
        () => Account,
        account => account.item,
    )
    accounts: Account[];
}
