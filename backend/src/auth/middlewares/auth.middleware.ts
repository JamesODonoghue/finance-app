import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

interface MyRequest extends Request {
    session?: {
        socketId: string;
    };
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: MyRequest, res: Response, next: Function) {
        console.log('Request...');

        if (req.query.socketId) {
            console.log(req.query.socketId);
            req.session.socketId = req.query.socketId;
        }
        next();
    }
}
