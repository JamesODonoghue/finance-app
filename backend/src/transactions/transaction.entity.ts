import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Account } from 'accounts/account.entity';
import { User } from 'users/user.entity';
@Entity()
export class Transaction {
    @PrimaryColumn()
    id: string;
    @ManyToOne(
        () => Account,
        account => account.transactions,
    )
    account: Account;

    @ManyToOne(
        () => User,
        user => user.transactions,
    )
    user: User;
    @Column()
    category: string;
    @Column()
    transactionType: string;
    @Column()
    transactionName: string;
    @Column({ nullable: true })
    transactionCode: string;
    @Column({ type: 'float' })
    amount: number;
    @Column()
    isoCurrencyCode: string;
    @Column({ nullable: true })
    unofficialCurrencyCode: string;
    @Column()
    transactionDate: string;
    @Column()
    pending: boolean;
    @Column({ nullable: true })
    accountOwner: string;
}
