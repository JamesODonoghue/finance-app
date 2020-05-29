import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                console.log(configService.get('POSTGRES_HOST'));
                console.log(process.env.NODE_ENV);
                return {
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST', 'localhost'),
                    port: configService.get('POSTGRES_PORT', 5432),
                    username: configService.get('POSTGRES_USER', 'postgres'),
                    password: configService.get(
                        'POSTGRES_PASSWORD',
                        'postgres',
                    ),
                    database: configService.get('POSTGRES_DB', 'finances'),
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: true,
                };
            },
        }),
    ],
})
export class DatabaseModule {}
