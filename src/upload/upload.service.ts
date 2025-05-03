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
  constructor() {
    // Verificar configuração do Cloudinary
    const requiredEnvVars = [
      'CLOUDINARY_CLOUD_NAME',
      'CLOUDINARY_API_KEY',
      'CLOUDINARY_API_SECRET',
    ];
    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName],
    );
    if (missingVars.length > 0) {
      console.error(
        `Variáveis de ambiente faltando: ${missingVars.join(', ')}`,
      );
      throw new Error('Configuração do Cloudinary incompleta');
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

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
            console.error('Erro ao fazer upload para o Cloudinary:', error);
            return reject(
              new InternalServerErrorException(
                'Erro ao fazer upload da imagem.',
              ),
            );
          }

          if (!result?.secure_url) {
            return reject(
              new InternalServerErrorException(
                'Upload falhou. Nenhuma URL retornada.',
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
        console.warn(
          `Imagem não encontrada ou erro ao deletar: ${publicId}, resultado: ${result.result}`,
        );
      }
    } catch (error: unknown) {
      console.error(`Erro ao deletar imagem ${publicId} no Cloudinary:`, error);
      // Não lançar erro para não interromper a exclusão do animal
    }
  }
}
