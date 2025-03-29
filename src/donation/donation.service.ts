import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation, DonationDocument } from './schema/donation.schema';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Animal } from '../animal/schema/animal.schema';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<DonationDocument>,
    @InjectModel(Animal.name) private animalModel: Model<Animal>,
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

  async findByAnimal(
    animalId: string,
  ): Promise<{ animal: Animal; donations: Donation[] } | { message: string }> {
    const animal = await this.animalModel.findById(animalId);

    if (!animal) throw new NotFoundException('Animal não encontrado');

    const donations = await this.donationModel
      .find({ animalId })
      .select('-animalId -updatedAt -__v')
      .lean();

    if (!donations.length) {
      return { message: 'Nenhuma doação encontrada para este animal.' };
    }

    return {
      animal,
      donations,
    };
  }
}
