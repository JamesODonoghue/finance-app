import { Item } from './item.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlaidService {
    constructor(
        @InjectRepository(Item) private itemRepository: Repository<Item>,
    ) {}

    findByOneByToken(token: string): Promise<Item> {
        return this.itemRepository.findOne(token);
    }
}
