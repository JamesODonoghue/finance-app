import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository, ConnectionOptions } from 'typeorm';
import * as mock from './transactions.mock.json';
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

const expected = [
    {
        plaidTransactionId: '5vDMkpVX9atJ4RKy5r39sqNlXoGjAmtZKW6P4',
        userId: '12345',
        accountId: 'XymVxPw3jRIVpbqwRvr3i6kwnkjVQZfdLxV8q',
        category: 'Payment',
        transactionType: 'special',
        transactionDate: '2020-05-15',
        transactionName: 'CREDIT CARD 3333 PAYMENT *//',
        amount: 25,
        pending: false,
        accountOwner: null,
        isoCurrencyCode: 'USD',
        unofficialCurrencyCode: null,
    },
    {
        plaidTransactionId: 'RWEyq31lxAF8RQEDwkxZh5nZVNRP4WCRpBZvq',
        userId: '12345',
        accountId: '6RVbplBk94iXdBv4nzx1cbvepvMongugexNnp',
        category: 'Travel',
        transactionType: 'special',
        transactionDate: '2020-05-15',
        transactionName: 'Uber',
        amount: 5.4,
        pending: false,
        accountOwner: null,
        isoCurrencyCode: 'USD',
        unofficialCurrencyCode: null,
    },
];

describe('Transactions Service', () => {
    let service: TransactionsService;
    let repository: Repository<Transaction>;
    let module: TestingModule;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({ ...testConnection, entities: [Transaction] }),
                TypeOrmModule.forFeature([Transaction]),
            ],
            providers: [TransactionsService],
            controllers: [TransactionsController],
        }).compile();

        repository = module.get<Repository<Transaction>>(getRepositoryToken(Transaction));
        service = module.get<TransactionsService>(TransactionsService);
    });

    afterEach(async () => {
        await repository.clear();
        await repository.manager.connection.close();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should correctly map and save transactions', async () => {
        const actual = await service.create(mock.slice(0, 2), '12345');
        expect(expected).toEqual(actual);
    });

    it('should return the right transactions for the user', async () => {
        await service.create(mock.slice(0, 2), '12345');
        const actual = await service.findByUser('12345');
        expect(expected).toEqual(actual);
    });
});
