import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './account.entity';
import { Repository, ConnectionOptions } from 'typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Item } from 'items/item.entity';

const testConnection: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'jodonogh',
    password: 'postgres',
    database: 'test_db',
    synchronize: true,
    logging: false,
    dropSchema: true,
};

describe('Accounts Service', () => {
    let service: AccountsService;
    let repository: Repository<Account>;
    let module: TestingModule;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({ ...testConnection, entities: [Account, Item] }),
                TypeOrmModule.forFeature([Account]),
            ],
            providers: [AccountsService],
            controllers: [AccountsController],
        }).compile();

        repository = module.get<Repository<Account>>(getRepositoryToken(Account));
        service = module.get<AccountsService>(AccountsService);
    });

    afterEach(async () => {
        await repository.clear();
        await repository.manager.connection.close();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
