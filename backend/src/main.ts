import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const logger = app.get(Logger);
    const port = configService.get<string>('PORT') || 5000;
    logger.setContext('Main');
    logger.log(`Listening on: ${port}`);

    await app.listen(port);
}
bootstrap();
