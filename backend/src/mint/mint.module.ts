import { MintService } from './mint.service';
import { MintController } from './mint.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}