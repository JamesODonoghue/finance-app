import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/users.service';
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
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
    imports: [ConfigModule.forRoot(), UsersModule],
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
