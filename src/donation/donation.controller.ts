import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from './schema/donation.schema';
import { Animal } from '../animal/schema/animal.schema';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async create(
    @Body() createDonationDto: CreateDonationDto,
  ): Promise<Donation> {
    return this.donationService.create(createDonationDto);
  }

  @Get()
  async findAll(): Promise<Donation[]> {
    return this.donationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Donation> {
    return this.donationService.findOne(id);
  }

  @Get('animal/:animalId')
  async findByAnimal(
    @Param('animalId') animalId: string,
  ): Promise<{ animal: Animal; donations: Donation[] } | { message: string }> {
    return this.donationService.findByAnimal(animalId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.donationService.remove(id);
    return { message: 'Donation removed successfully' };
  }
}
