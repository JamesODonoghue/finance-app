import { Controller, Get, UseGuards, Req, Res, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(private configService: ConfigService, private logger: Logger) {
        logger.setContext('AuthController');
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    public async googleSignIn() {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    public async googleCallback(@Req() req, @Res() res) {
        const jwt: string = req.user.jwt;
        const clientUrl = this.configService.get<string>('CLIENT_URL');
        const redirectUrl = `${clientUrl}${jwt && `/?token=${jwt}`}`;

        this.logger.log('Inside google/callback. Redirecting to client...');
        this.logger.warn(`Client Url: ${clientUrl}`);
        this.logger.debug(`Redirect Url: ${redirectUrl}`);

        res.redirect(redirectUrl);
    }
}
