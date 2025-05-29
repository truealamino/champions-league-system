import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {join} from 'path';
import {fastifyStatic} from '@fastify/static';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';

async function bootstrap() {
  const adapter: FastifyAdapter = new FastifyAdapter();
  const app: NestFastifyApplication = await NestFactory.create(AppModule, adapter);
  app.enableCors({
    origin: 'http://localhost:3000', // ou ['http://localhost:3000'] para múltiplas origens
    credentials: true,
  });

  // Servir arquivos estáticos da pasta "uploads"
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'uploads'),
    prefix: '/uploads/', // Acessível via http://localhost:3005/uploads/filename.png
  });

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
