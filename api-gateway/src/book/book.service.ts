import { Observable } from 'rxjs';
import { BookDto } from './dto/book.dto';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { BookAssessmentsDto } from './dto/bookAssessments.dto';

@Injectable()
export class BookService implements OnModuleInit, OnModuleDestroy {
  @Client({
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

  create(createBook: BookDto): Observable<BookDto> {
    return this.client.send('create-book', createBook);
  }

  createAssessments(
    createBookAssessments: BookAssessmentsDto,
  ): Observable<BookAssessmentsDto> {
    return this.client.send('create-book-assessments', createBookAssessments);
  }

  findAll(): Observable<BookDto[]> {
    return this.client.send('find-all-book', {});
  }

  findOne(id: number): Observable<BookDto> {
    return this.client.send('find-book', { id });
  }

  update(payload: BookDto) {
    return this.client.emit('update-book', payload);
  }

  remove(id: number) {
    return this.client.emit('delete-book', { id });
  }
}
