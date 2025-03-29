import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalModule } from './animal/animal.module';
import { NeedItemModule } from './need-item/need-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AnimalModule,
    NeedItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    if (!process.env.MONGO_URI) {
      throw new Error('A variável de ambiente MONGO_URI não está definida');
    }
  }
}
