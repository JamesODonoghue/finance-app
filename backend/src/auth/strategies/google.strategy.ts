import { Provider, AuthService } from './../auth.service';
import { Strategy } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_CB'),
            passReqToCallback: true,
            scope: ['profile', 'email'],
        });
    }
    async validate(
        request: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: Function,
    ) {
        try {
            const jwt: string = await this.authService.validateOAuthLogin({
                id: profile.id,
                displayName: profile.displayName,
                photo: profile.photos[0].value,
            });
            const user = {
                jwt,
            };
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
}
