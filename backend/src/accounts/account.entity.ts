import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
    @PrimaryColumn()
    plaidAccountId: string;
    @Column()
    itemId: string;
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    mask: string;
    @Column({ nullable: true })
    official_name: string;
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
