import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Account } from 'accounts/account.entity';

@Entity()
export class Item {
    @PrimaryColumn()
    plaidAccessToken: string;
    @Column()
    plaidItemId: string;
    @Column()
    userId: string;
    @Column({ nullable: true })
    institutionId?: string;
    @OneToMany(
        () => Account,
        account => account.item,
    )
    accounts: Account[];
}
