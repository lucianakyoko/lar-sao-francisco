import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from './schema/donation.schema';

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
}
