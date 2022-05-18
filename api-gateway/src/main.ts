//https://www.youtube.com/watch?v=KDAwfMR0inQ&list=UUX3TI4bDNEGLVmGIoJSwlfg&index=22
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('App example')
    .setDescription('The app API description')
    .setVersion('1.0')
    .addTag('app')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT, () =>
    logger.log('api-gateway is running'),
  );
}
bootstrap();
