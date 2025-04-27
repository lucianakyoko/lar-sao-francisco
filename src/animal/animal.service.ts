import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal, AnimalDocument } from './schema/animal.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { UploadService } from '../upload/upload.service';

export type CreateAnimalResponse = {
  success: boolean;
  message: string;
  data: Animal;
};

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    private readonly uploadService: UploadService,
  ) {}

  private extractPublicId(url: string): string | null {
    const parts = url.split('/');
    const fileWithExtension = parts[parts.length - 1];
    const folder = parts[parts.length - 2];

    const [fileName] = fileWithExtension.split('.');

    if (!folder || !fileName) return null;

    return `${folder}/${fileName}`;
  }

  async create(
    createAnimalDto: CreateAnimalDto,
    images?: Express.Multer.File[],
  ): Promise<CreateAnimalResponse> {
    let uploadedImages: string[] = [];

    if (images && images.length > 0) {
      uploadedImages = await Promise.all(
        images.map((file) => this.uploadService.uploadImage(file)),
      );
    }

    const newAnimal = new this.animalModel({
      ...createAnimalDto,
      images: uploadedImages,
    });

    await newAnimal.save();
    return {
      success: true,
      message: 'Animal cadastrado com sucesso!',
      data: newAnimal,
    };
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

  async update(
    id: string,
    updateAnimalDto: UpdateAnimalDto,
    images?: Express.Multer.File[],
  ): Promise<Animal> {
    const animal = await this.animalModel.findById(id).exec();

    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    if (images && images.length > 0) {
      await Promise.all(
        animal.images.map(async (url) => {
          const publicId = this.extractPublicId(url);
          if (publicId) {
            await this.uploadService.deleteImage(publicId);
          }
        }),
      );

      const uploadedImages = await Promise.all(
        images.map((file) => this.uploadService.uploadImage(file)),
      );

      updateAnimalDto = {
        ...updateAnimalDto,
        images: uploadedImages,
      };
    }

    const updatedAnimal = await this.animalModel
      .findByIdAndUpdate(id, updateAnimalDto, { new: true })
      .exec();

    if (!updatedAnimal) {
      throw new NotFoundException('Error updating animal');
    }

    return updatedAnimal;
  }

  async delete(id: string): Promise<Animal> {
    const animal = await this.animalModel.findById(id).exec();
    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    if (animal.images && animal.images.length > 0) {
      await Promise.all(
        animal.images.map(async (url) => {
          const publicId = this.extractPublicId(url);
          if (publicId) {
            await this.uploadService.deleteImage(publicId);
          }
        }),
      );
    }

    await animal.deleteOne();
    return animal;
  }
}
