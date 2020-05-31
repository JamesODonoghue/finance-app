import { Controller, Get, Post, Body } from '@nestjs/common';
import fetch from 'node-fetch';
@Controller('ngrok')
export class NgrokController {
    @Get('/')
    async getWebhookUrl() {
        const response = await fetch('http://ngrok:4040/api/tunnels');
        const { tunnels } = await response.json();
        const httpTunnel = tunnels.find(t => t.proto === 'http');
        return {
            url: httpTunnel.public_url,
        };
    }
}
