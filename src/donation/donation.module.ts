import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from './schema/donation.schema';
import { Animal, AnimalSchema } from '../animal/schema/animal.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guard/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
      { name: Animal.name, schema: AnimalSchema },
    ]),
    AuthModule,
  ],
  providers: [DonationService, AuthGuard],
  controllers: [DonationController],
})
export class DonationModule {}
