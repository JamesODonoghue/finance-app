import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Item } from 'items/item.entity';
import { Transaction } from 'transactions/transaction.entity';
import { Account } from 'accounts/account.entity';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    @Column()
    displayName: string;
    @Column({ default: true })
    isActive: boolean;
    @OneToMany(
        () => Item,
        item => item.user,
    )
    items: Item[];
    @OneToMany(
        () => Account,
        account => account.user,
    )
    accounts: Account[];
    @OneToMany(
        () => Transaction,
        transaction => transaction.user,
    )
    transactions: Transaction[];
}
