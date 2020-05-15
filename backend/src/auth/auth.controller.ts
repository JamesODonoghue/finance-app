import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    public async googleSignIn() {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    public async googleCallback(@Req() req, @Res() res) {
        const jwt: string = req.user.jwt;
        if (jwt) res.redirect('http://localhost:3001/?token=' + jwt);
        else res.redirect('http://localhost:3001/');
    }

    // @Post('plaid/public_token')
    // public async receivePublicToken(
    //     @Body() { user_token, plaid_token }: UserToken,
    // ) {
    //     try {
    //         return this.authService.receivePublicToken({
    //             user_token,
    //             plaid_token,
    //         });
    //     } catch (error) {
    //         return new Error(error);
    //     }
    // }
}
