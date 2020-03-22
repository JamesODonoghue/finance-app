import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
