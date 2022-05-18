import { Observable } from 'rxjs';
import { Book } from './interfaces/book.interface';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { BookAssessments } from './interfaces/bookAssessments.interface';

@Injectable()
export class BookService implements OnModuleInit, OnModuleDestroy {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'book',
        brokers: ['host.docker.internal:9092'],
      },
      consumer: {
        groupId: 'book-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;
  async onModuleInit() {
    const requestPatters = [
      'find-all-book',
      'find-book',
      'create-book',
      'create-book-assessments',
    ];

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

  create(createBook: Book): Observable<Book> {
    return this.client.send('create-book', createBook);
  }

  createAssessments(
    createBookAssessments: BookAssessments,
  ): Observable<BookAssessments> {
    return this.client.send('create-book-assessments', createBookAssessments);
  }

  findAll(): Observable<Book[]> {
    return this.client.send('find-all-book', {});
  }

  findOne(id: number): Observable<Book> {
    return this.client.send('find-book', { id });
  }

  update(payload: Book) {
    return this.client.emit('update-book', payload);
  }

  remove(id: number) {
    return this.client.emit('delete-book', { id });
  }
}
