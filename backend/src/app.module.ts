import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
@Module({
    imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule],
})
export class AppModule {}
