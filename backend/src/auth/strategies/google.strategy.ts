import { Strategy } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'), // <- Replace this with your client id
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'), // <- Replace this with your client secret
            callbackURL: configService.get<string>('GOOGLE_CB_URL'),
            passReqToCallback: true,
            scope: ['profile', 'email'],
        });
    }
    async validate(
        request: any,
        accessToken: string,
        refreshToken: string,
        profile,
        done: Function,
    ) {
        try {
            // const jwt: string = 'placeholderJWT';
            const user = {
                email: profile.emails[0].value,
                name: profile.displayName,
                token: accessToken,
            };
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
}
