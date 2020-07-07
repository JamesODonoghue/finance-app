import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'items/item.entity';
import { CreateItemDto } from 'items/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) {}

    createItem(item: CreateItemDto): Promise<Item> {
        return this.itemRepository.save(item);
    }

    updateItem(item: Item) {
        return this.itemRepository.save(item);
    }

    retrieveItemsByUser(userId: string) {
        return this.itemRepository.find({
            where: { userId: userId },
            relations: ['accounts'],
        });
    }

    retrieveItemByPlaidId(plaidItemId: string) {
        return this.itemRepository.findOne({
            where: { plaidItemId: plaidItemId },
        });
    }

    clearItems() {
        return this.itemRepository.query('TRUNCATE "item" CASCADE');
    }
}
