import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

export type DeleteAnimalResponse = {
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
    try {
      // Exemplo de URL: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/animals/<file>.jpg
      const regex = /\/image\/upload\/v\d+\/(animals\/[^.]+)\./;
      const match = url.match(regex);
      if (!match) {
        console.warn(`URL inválida para extração de publicId: ${url}`);
        return null;
      }
      return match[1]; // Retorna "animals/<file>"
    } catch (error) {
      console.error(`Erro ao extrair publicId de ${url}:`, error);
      return null;
    }
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

    // Deletar imagens antigas do animal, se novas forem fornecidas
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

  async delete(id: string): Promise<DeleteAnimalResponse> {
    try {
      // Validar ID
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new NotFoundException('ID inválido');
      }

      // Buscar animal
      const animal = await this.animalModel.findById(id).exec();
      if (!animal) {
        throw new NotFoundException('Animal não encontrado');
      }

      // Deletar imagens do animal (hospedadas no Cloudinary)
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

      // Não é necessário deletar imagens do needsList, pois são URLs externas

      // Deletar o animal
      await this.animalModel.findByIdAndDelete(id).exec();

      return {
        success: true,
        message: 'Animal deletado com sucesso!',
        data: animal,
      };
    } catch (error) {
      console.error('Erro ao deletar animal:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro interno ao deletar animal');
    }
  }
}
