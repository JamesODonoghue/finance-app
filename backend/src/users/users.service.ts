import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    findOneByThirdPartyId(id): Promise<User> {
        // return this.usersRepository.findOne({ where: { id: id } });
        let users = this.usersRepository.find();
        return users[0];
    }

    registerOauthUser({ id, displayName }) {
        return this.usersRepository.create({
            id,
            displayName,
        });
    }
}
