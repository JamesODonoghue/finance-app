import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'items/item.entity';
import { CreateItemDto } from 'items/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item) private itemRepository: Repository<Item>,
    ) {}

    createItem(item: CreateItemDto): Promise<Item> {
        return this.itemRepository.save({
            ...item,
        });
    }
}
