import { ConfigService, ConfigModule } from '@nestjs/config';
import { Item } from './item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Item])],
    providers: [PlaidService, ConfigService],
    controllers: [PlaidController],
    exports: [PlaidService],
})
export class PlaidModule {}
