import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';

type CloudinaryDestroyResponse = {
  result: 'ok' | 'not found';
};

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

  async deleteImage(publicId: string): Promise<void> {
    try {
      const result = (await cloudinary.uploader.destroy(
        publicId,
      )) as CloudinaryDestroyResponse;

      if (result.result !== 'ok') {
        throw new Error(`Error deleting image. Result: ${result.result}`);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error deleting image in Cloudinary:', err.message);
      throw new Error(err.message || 'Error deleting image');
    }
  }
}
