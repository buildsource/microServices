import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;
  async onModuleInit() {
    const requestPatters = ['find-all-user', 'find-user'];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  create(createUser: User) {
    return this.client.emit('create-user', createUser);
  }

  findAll(): Observable<User[]> {
    return this.client.send('find-all-user', {});
  }

  findOne(id: number): Observable<User> {
    return this.client.send('find-user', { id });
  }

  update(payload: User) {
    return this.client.emit('update-user', payload);
  }

  remove(id: number) {
    return this.client.emit('delete-user', { id });
  }

  activate(id: number) {
    return this.client.emit('activate-user', { id });
  }

  inactivate(id: number) {
    return this.client.emit('inactivate-user', { id });
  }
}
