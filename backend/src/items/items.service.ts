import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'items/item.entity';
import { CreateItemDto } from 'items/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) {}

    create(item: CreateItemDto): Promise<Item> {
        return this.itemRepository.save(item);
    }
    update(item: Item): Promise<Item> {
        return this.itemRepository.save(item);
    }
    getAll(userId: string): Promise<Item> {
        return this.itemRepository.findOne({ where: { userId }, relations: ['accounts', 'user'] });
    }
    get(itemId: string): Promise<Item> {
        return this.itemRepository.findOne(itemId, { relations: ['user'] });
    }
    clear() {
        return this.itemRepository.query('TRUNCATE "item" CASCADE');
    }
}
