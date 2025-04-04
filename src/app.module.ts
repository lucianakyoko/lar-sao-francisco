import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalModule } from './animal/animal.module';
import { NeedItemModule } from './need-item/need-item.module';
import { DonationModule } from './donation/donation.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AnimalModule,
    NeedItemModule,
    DonationModule,
    UserModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    if (!process.env.MONGO_URI) {
      throw new Error('Environment variable MONGO_URI is not defined');
    }
  }
}
