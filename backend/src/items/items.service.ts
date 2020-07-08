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

    findByUser(userId: string): Promise<Item[]> {
        return this.itemRepository.find({
            where: { userId: userId },
            relations: ['accounts'],
        });
    }

    findByPlaidId(plaidItemId: string): Promise<Item> {
        return this.itemRepository.findOne({
            where: { plaidItemId: plaidItemId },
        });
    }

    clear() {
        return this.itemRepository.query('TRUNCATE "item" CASCADE');
    }
}
