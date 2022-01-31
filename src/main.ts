import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv'
import { DurationInterceptor } from './interceptors/duration.interceptor';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: ['http://localhost:4200']
  }
  app.enableCors(corsOptions)
  app.use(morgan('dev'));
  app.use(
    (req: Request, res: Response, next) => {
      console.log('Middelwasre from app.use');
      next();

    }
  )
  app.useGlobalPipes(new ValidationPipe( {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.useGlobalInterceptors(new DurationInterceptor())
  await app.listen(process.env.APP_PORT);
}
bootstrap();
