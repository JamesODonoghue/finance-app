import { Item } from './item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Item])],
    providers: [PlaidService],
    controllers: [PlaidController],
})
export class PlaidModule {}
