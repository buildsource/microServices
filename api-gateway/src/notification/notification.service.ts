import { PhoneDto } from './dto/phone.dto';
import { EmailDto } from './dto/email.dto';
import { Observable } from 'rxjs';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class NotificationService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['localhost:9092'],
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

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  sendEmail(data: EmailDto): Observable<EmailDto> {
    return this.client.emit('notification-email', data);
  }

  sendPhone(data: PhoneDto): Observable<PhoneDto> {
    return this.client.emit('notification-phone', data);
  }
}
