import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
    @PrimaryColumn()
    accessToken: string;
    @Column()
    userId: string;
    @Column({ nullable: true })
    institutionId: string;
    @Column({ nullable: true })
    itemId: string;
}
