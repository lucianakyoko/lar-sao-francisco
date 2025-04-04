import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file?.buffer) {
      throw new InternalServerErrorException('Invalid file or missing buffer.');
    }

    return new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'animals' },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) {
            console.error('Error on Cloudinary:', error);
            return reject(
              new InternalServerErrorException('Error uploading image.'),
            );
          }

          if (!result?.secure_url) {
            return reject(
              new InternalServerErrorException(
                'Upload failed. No URL returned.',
              ),
            );
          }

          return resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }
}
