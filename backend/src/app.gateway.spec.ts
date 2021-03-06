import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './app.gateway';

describe('App Gateway', () => {
    let gateway: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppGateway],
        }).compile();

        gateway = module.get<AppGateway>(AppGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
