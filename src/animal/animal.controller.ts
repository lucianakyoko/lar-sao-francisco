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
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Animal } from './schema/animal.schema';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateAnimalResponse } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 4),
    FilesInterceptor('itemImages', 10),
  )
  async create(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      itemImages?: Express.Multer.File[];
    },
  ): Promise<CreateAnimalResponse> {
    return this.animalService.create(
      createAnimalDto,
      files.images,
      files.itemImages,
    );
  }

  @Get()
  async findAll() {
    return this.animalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Animal | null> {
    return this.animalService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 4),
    FilesInterceptor('itemImages', 10),
  )
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      itemImages?: Express.Multer.File[];
    },
  ) {
    return this.animalService.update(
      id,
      updateAnimalDto,
      files.images,
      files.itemImages,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<Animal> {
    return this.animalService.delete(id);
  }
}
