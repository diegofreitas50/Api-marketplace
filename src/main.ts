import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Games - Cadastro')
    .setDescription('Portal de usuários. Seja bem vindo !')
    .setVersion('1.0.1')
    .addTag('status')
    .addTag('auth')
    .addTag('user')
    .addTag('profile')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001)
}
bootstrap();
