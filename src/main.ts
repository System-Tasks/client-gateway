import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger('Main Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:4000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, 
  });

  await app.listen(envs.port);

  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
