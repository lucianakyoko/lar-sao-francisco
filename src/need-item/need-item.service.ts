import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Animal, AnimalDocument } from '../animal/schema/animal.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NeedItemDto } from './dto/need-item.dto';
import { UpdateNeedItemDto } from './dto/update-need-item.dto';
import { ObjectId } from 'mongodb';

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

  async getOne(animalId: string, needId: string): Promise<NeedItemDto> {
    const animal = await this.animalModel.findById(animalId);
    if (!animal) throw new NotFoundException('Animal not found');

    const needItem = animal.needsList.find(
      (item) => item?._id?.toString() === needId,
    );
    if (!needItem) throw new NotFoundException('Need item not found');

    return needItem;
  }

  async updateNeedItem(
    animalId: string,
    needId: string,
    updateNeedItemDto: UpdateNeedItemDto,
  ): Promise<NeedItemDto> {
    const updatedAnimal = await this.animalModel
      .findOneAndUpdate(
        { _id: animalId, 'needsList._id': new ObjectId(needId) },
        {
          $set: {
            'needsList.$.name': updateNeedItemDto.name,
            'needsList.$.price': updateNeedItemDto.price,
            'needsList.$.image': updateNeedItemDto.image,
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedAnimal) {
      throw new Error('Animal or need item not found');
    }

    const updatedNeedItem = updatedAnimal.needsList.find(
      (item) => item._id && item._id.toString() === needId,
    );
    if (!updatedNeedItem) {
      throw new Error('Updated need item not found');
    }

    return {
      name: updatedNeedItem.name,
      price: updatedNeedItem.price,
      image: updatedNeedItem.image,
    };
  }

  async removeNeedItem(animalId: string, needId: string): Promise<NeedItemDto> {
    const animal = await this.animalModel.findById(animalId);
    if (!animal) throw new NotFoundException('Animal not found');

    const needItem = animal.needsList.find(
      (item) => item._id && item._id.toString() === needId,
    );
    if (!needItem) throw new NotFoundException('Need item not found');

    animal.needsList = animal.needsList.filter(
      (item) => item._id && item._id.toString() !== needId,
    );

    await animal.save();

    return {
      image: needItem.image,
      name: needItem.name,
      price: needItem.price,
    };
  }
}
