import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/');

  app.use(helmet());
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.use((req, res, next) => {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      console.log(`Request to ${req.path} took ${elapsedTimeInMs} ms`);
    });

    next();
  });

  await app.listen(9000);
}

bootstrap();
