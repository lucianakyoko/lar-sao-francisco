// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: [
//       'http://localhost:3000',
//       'http://localhost:5173',
//       'https://lar-sao-francisco.vercel.app',
//     ],
//     methods: 'GET,PATCH,POST,DELETE, OPTIONS',
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   });
//   app.useGlobalPipes(new ValidationPipe());
//   app.setGlobalPrefix('api/v1');
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://lar-sao-francisco.vercel.app',
      ],
      methods: ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
