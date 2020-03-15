import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    findOneByThirdPartyId(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    registerOauthUser({ id, displayName }) {
        return this.usersRepository.save({
            id,
            displayName,
        });
    }
}
