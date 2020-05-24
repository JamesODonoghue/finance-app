import { Module } from '@nestjs/common';
import { NgrokController } from './ngrok.controller';

@Module({
    controllers: [NgrokController],
})
export class NgrokModule {}
