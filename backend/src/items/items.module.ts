import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { PlaidModule } from 'plaid/plaid.module';

@Module({
    imports: [TypeOrmModule.forFeature([Item]), PlaidModule],
    providers: [ItemsService],
    exports: [ItemsService],
    controllers: [ItemsController],
})
export class ItemsModule {}
