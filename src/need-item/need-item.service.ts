import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Animal, AnimalDocument } from '../animal/schema/animal.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NeedItemDto } from './dto/need-item.dto';

@Injectable()
export class NeedItemService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
  ) {}

  async addNeedItem(
    animalId: string,
    needItemDto: NeedItemDto,
  ): Promise<Animal> {
    const animal = await this.animalModel.findById(animalId);
    if (!animal) throw new NotFoundException('Animal not found');

    const alreadyExists = animal.needsList.some(
      (item) => item.name === needItemDto.name,
    );
    if (alreadyExists)
      throw new BadRequestException('This item already extists');

    animal.needsList.push(needItemDto);
    return animal.save();
  }

  async getAllNeedItems(animalId: string): Promise<NeedItemDto[]> {
    const animal = await this.animalModel.findById(animalId);
    if (!animal) throw new NotFoundException('Animal not found');

    return animal.needsList;
  }
}
