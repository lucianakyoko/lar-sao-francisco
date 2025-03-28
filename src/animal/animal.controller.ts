import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Animal } from './schema/animal.schema';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
    return this.animalService.create(createAnimalDto);
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
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ): Promise<Animal> {
    return this.animalService.update(id, updateAnimalDto);
  }
}
