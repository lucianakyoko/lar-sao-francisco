import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation, DonationDocument } from './schema/donation.schema';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<DonationDocument>,
  ) {}

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const newDonation = new this.donationModel(createDonationDto);
    return newDonation.save();
  }

  async findAll(): Promise<Donation[]> {
    return this.donationModel
      .find()
      .populate('animalId')
      .populate('donatedItems.itemId');
  }

  async findOne(id: string): Promise<Donation> {
    const donation = await this.donationModel
      .findById(id)
      .populate('animalId')
      .populate('donatedItems.itemId');

    if (!donation) throw new NotFoundException('Donation not found');

    return donation;
  }
}
