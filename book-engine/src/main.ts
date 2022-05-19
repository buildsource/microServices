import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'book',
          brokers: ['172.17.0.1:9092'],
        },
        consumer: {
          groupId: 'book-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  await app.listen().then(() => logger.log('book-engine is running'));
}
bootstrap();
