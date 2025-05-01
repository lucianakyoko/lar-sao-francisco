import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Animal } from './schema/animal.schema';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateAnimalResponse } from './animal.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 4))
  async create(
    @Body('dto') createAnimalDtoString: string,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<CreateAnimalResponse> {
    let createAnimalDto: CreateAnimalDto;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createAnimalDto = JSON.parse(createAnimalDtoString);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Invalid DTO format');
    }

    if (
      !createAnimalDto.name ||
      !createAnimalDto.birthDate ||
      !createAnimalDto.personality ||
      !createAnimalDto.size ||
      !createAnimalDto.about
    ) {
      throw new BadRequestException('Missing required fields in DTO');
    }

    return this.animalService.create(createAnimalDto, images || []);
  }

  @Get()
  async findAll(): Promise<Animal[]> {
    return this.animalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Animal | null> {
    return this.animalService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 4))
  async update(
    @Param('id') id: string,
    @Body('dto') updateAnimalDtoString: string,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<Animal> {
    let updateAnimalDto: UpdateAnimalDto;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updateAnimalDto = JSON.parse(updateAnimalDtoString);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Invalid DTO format');
    }

    return this.animalService.update(id, updateAnimalDto, images || []);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<Animal> {
    return this.animalService.delete(id);
  }
}
