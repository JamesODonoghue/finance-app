import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Req,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly googleService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    public async googleSignIn() {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    public async googleCallback(@Req() req, @Res() res) {
        // handles the Google OAuth2 callback
        // const jwt: string = req.user.jwt;
        // console.log(res);

        // const { code } = res;

        // if (jwt) res.redirect('http://localhost:3000/' + code);
        // else res.redirect('http://localhost:3000/');

        res.redirect(`http://localhost:3000?token=${req.user.token}`);
    }
}
