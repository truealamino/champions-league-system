import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // ou ['http://localhost:3000'] para múltiplas origens
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
