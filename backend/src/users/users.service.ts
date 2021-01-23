import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    create({ id, displayName }) {
        return this.usersRepository.save({
            id,
            displayName,
        });
    }

    update(user: User) {
        return this.usersRepository.save(user);
    }

    findById(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async getItems(id: string) {
        const { items } = await this.usersRepository.findOne(id, {
            relations: ['items'],
        });
        return items;
    }

    async getAccounts(id: string) {
        return await this.usersRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.items', 'item')
            .innerJoinAndSelect('item.accounts', 'account')
            .where('user.id = :userId', { userId: id })
            .getMany();
    }
    async getTransactions(id: string) {
        const { transactions } = await this.usersRepository.findOne(id, { relations: ['transactions'] });
        return transactions;
    }
}
