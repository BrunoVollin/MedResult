import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryErrorFilter } from './infra/filters/query-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new QueryErrorFilter(httpAdapter));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
