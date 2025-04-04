import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './schema/animal.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
    AuthModule,
    UploadModule,
  ],
  controllers: [AnimalController],
  providers: [AnimalService, AuthGuard],
  exports: [MongooseModule],
})
export class AnimalModule {}
