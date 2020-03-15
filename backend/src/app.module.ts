// import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
    imports: [AuthModule, UsersModule],
})
export class AppModule {}
