import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Item } from 'items/item.entity';
import { Transaction } from 'transactions/transaction.entity';
import { User } from 'users/user.entity';

@Entity()
export class Account {
    @PrimaryColumn()
    id: string;
    @ManyToOne(
        () => Item,
        item => item.accounts,
    )
    item: Item;
    @ManyToOne(
        () => Item,
        item => item.accounts,
    )
    user: User;
    @OneToMany(
        () => Transaction,
        transaction => transaction.account,
    )
    transactions: Transaction[];
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    mask: string;
    @Column({ nullable: true })
    officialName: string;
    @Column({ type: 'float', nullable: true })
    currentBalance: number;
    @Column({ type: 'float', nullable: true })
    availableBalance: number;
    @Column({ nullable: true })
    isoCurrencyCode: string;
    @Column({ nullable: true })
    unofficialCurrencyCode: string;
    @Column({ nullable: true })
    type: string;
    @Column({ nullable: true })
    subtype: string;
}
