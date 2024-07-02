import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';
import { envs } from './shared';

async function bootstrap() {


  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(json({ limit: '60mb' }));

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API NUPAY')
    .setDescription('NUPAY es una plataforma de pasarela de pagos que permite a los usuarios registrar y autenticar, gestionar perfiles, procesar pagos, gestionar transacciones, realizar retiros y depósitos, y recibir notificaciones. La API proporciona endpoints seguros y eficientes para manejar todas estas funcionalidades.')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(envs.port);


}
bootstrap();