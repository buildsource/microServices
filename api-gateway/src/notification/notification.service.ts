import { Observable } from 'rxjs';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Email } from './interfaces/email.interface';
import { Phone } from './interfaces/phone.interface';

@Injectable()
export class NotificationService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['172.17.0.1:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatters = [];

    if (requestPatters.length > 0) {
      requestPatters.forEach(async (pattern) =>
        this.client.subscribeToResponseOf(pattern),
      );
      await this.client.connect();
    }
  }

  sendEmail(data: Email): Observable<Email> {
    return this.client.emit('notification-email', data);
  }

  sendPhone(data: Phone): Observable<Phone> {
    return this.client.emit('notification-phone', data);
  }
}
