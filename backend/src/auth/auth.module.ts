import { PlaidService } from './../plaid/plaid.service';
import { PlaidModule } from './../plaid/plaid.module';
import { UsersModule } from './../users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';
import {
    Module,
    MiddlewareConsumer,
    RequestMethod,
    NestModule,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
    imports: [ConfigModule.forRoot(), UsersModule, PlaidModule],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: '/auth/google', method: RequestMethod.GET });
    }
}
