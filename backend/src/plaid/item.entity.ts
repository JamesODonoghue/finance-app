import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
    @PrimaryColumn()
    access_token: string;

    @Column()
    public_token: string;

    @Column()
    account_id: string;
}
