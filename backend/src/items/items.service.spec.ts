import { Repository, ConnectionOptions } from 'typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { Account } from 'accounts/account.entity';

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

const expectedItem = {
    userId: '12345',
    institutionId: 'ins_2',
    institutionName: 'my_bank',
    id: '12345',
    plaidAccessToken: 'my_access_token',
};

describe('Items Service', () => {
    let service: ItemsService;
    let repository: Repository<Item>;
    let module: TestingModule;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({ ...testConnection, entities: [Item, Account] }),
                TypeOrmModule.forFeature([Item]),
            ],
            providers: [ItemsService],
            controllers: [ItemsService],
        }).compile();

        repository = module.get<Repository<Item>>(getRepositoryToken(Item));
        service = module.get<ItemsService>(ItemsService);
    });

    afterEach(async () => {
        await repository.query('TRUNCATE "item" CASCADE');
        await repository.manager.connection.close();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should correctly save an item', async () => {
        const actual = await service.create(expectedItem);
        expect(expectedItem).toEqual(actual);
    });

    it('should return an item by its plaidItemId', async () => {
        const { id } = expectedItem;
        await service.create(expectedItem);
        const actual = await service.findByPlaidId(id);
        expect(expectedItem).toEqual(actual);
    });

    // it('should properly save an account ', async () => {
    //     const { plaidItemId } = expectedItem;
    //     await service.create(expectedItem);
    //     const actual = await service.retrieveItemByPlaidId(plaidItemId);
    //     expect(expectedItem).toEqual(actual);
    // });
});
