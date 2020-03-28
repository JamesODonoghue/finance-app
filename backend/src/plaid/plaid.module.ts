import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';

@Module({
    providers: [PlaidService, ConfigService],
    exports: [PlaidService],
})
export class PlaidModule {}
