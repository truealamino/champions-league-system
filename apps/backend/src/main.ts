import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {fastifyStatic} from '@fastify/static';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import path from 'path';

async function bootstrap() {
  const adapter: FastifyAdapter = new FastifyAdapter();
  const app: NestFastifyApplication = await NestFactory.create(AppModule, adapter);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Servir arquivos estáticos da pasta "uploads"
  app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../uploads'),
    prefix: '/uploads/', // Acessível via http://localhost:3005/uploads/filename.png
  });
  await app.listen(process.env.PORT ?? 3005, '0.0.0.0');
}
bootstrap();
