import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryColumn()
    plaidTransactionId: string;
    @Column()
    userId: string;
    @Column()
    accountId: string;
    @Column()
    category: string;
    @Column()
    transactionType: string;
    @Column()
    transactionName: string;
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
