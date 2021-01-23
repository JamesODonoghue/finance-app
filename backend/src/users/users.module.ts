import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ItemsModule } from 'items/items.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ItemsModule)],
    providers: [UsersService],
    exports: [TypeOrmModule, UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
