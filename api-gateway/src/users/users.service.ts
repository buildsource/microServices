import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit, OnModuleDestroy {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['172.17.0.1:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;
  async onModuleInit() {
    const requestPatters = ['find-all-user', 'find-user', 'create-user'];

    if (requestPatters.length > 0) {
      requestPatters.forEach(async (pattern) =>
        this.client.subscribeToResponseOf(pattern),
      );
      await this.client.connect();
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  create(createUser: User): Observable<User> {
    return this.client.send('create-user', createUser);
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

  validateUser(email: string, password: string): Observable<User> {
    return this.client.send('validate-user', { email, password });
  }
}
