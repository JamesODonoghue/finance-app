import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { server } from 'websocket';
import * as http from 'http';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(5000);
}
bootstrap();
