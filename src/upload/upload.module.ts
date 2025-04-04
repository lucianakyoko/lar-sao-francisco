import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryProvider, UploadService],
  exports: [UploadService],
})
export class UploadModule {}
