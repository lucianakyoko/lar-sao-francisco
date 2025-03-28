import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal, AnimalDocument } from './schema/animal.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
  ) {}

  async create(CreateAnimalDto: CreateAnimalDto): Promise<Animal> {
    const newAnimal = new this.animalModel(CreateAnimalDto);
    return newAnimal.save();
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async findOne(id: string): Promise<Animal | null> {
    const animal = await this.animalModel.findById(id).exec();
    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    const updatedAnimal = await this.animalModel
      .findByIdAndUpdate(id, updateAnimalDto, { new: true })
      .exec();

    if (!updatedAnimal) {
      throw new NotFoundException('Animal not found');
    }

    return updatedAnimal;
  }
}
