import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from './schema/donation.schema';
import { Animal } from '../animal/schema/animal.schema';
import { AuthGuard } from '../auth/guard/auth.guard';

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
  @UseGuards(AuthGuard)
  async findAll(): Promise<Donation[]> {
    return this.donationService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<Donation> {
    return this.donationService.findOne(id);
  }

  @Get('animal/:animalId')
  @UseGuards(AuthGuard)
  async findByAnimal(
    @Param('animalId') animalId: string,
  ): Promise<{ animal: Animal; donations: Donation[] } | { message: string }> {
    return this.donationService.findByAnimal(animalId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.donationService.remove(id);
    return { message: 'Donation removed successfully' };
  }
}
