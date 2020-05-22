import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryColumn()
    plaidTransactionId: string;
    @Column()
    userId: string;
    @Column()
    accountId: string;
    @Column({ unique: true })
    plaidCategoryId: string;
    @Column()
    category: string;
    @Column()
    subcategory: string;
    @Column()
    transactionType: string;
    @Column()
    transactionName: string;
    @Column({ type: 'float' })
    amount: number;
    @Column()
    isoCurrencyCode: string;
    @Column()
    unofficialCurrencyCode: string;
    @Column()
    transactionDate: string;
    @Column()
    pending: string;
    @Column()
    accountOwner: string;
}
