import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from './schema/donation.schema';
import { Animal, AnimalSchema } from '../animal/schema/animal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
      { name: Animal.name, schema: AnimalSchema },
    ]),
  ],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
