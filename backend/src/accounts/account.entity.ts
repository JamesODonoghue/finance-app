import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Item } from 'items/item.entity';

@Entity()
export class Account {
    @PrimaryColumn()
    plaidAccountId: string;
    @Column()
    plaidItemId: string;
    @ManyToOne(() => Item, (item) => item.accounts)
    item: Item;
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
