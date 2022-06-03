import { Observable } from 'rxjs';
import { FlamingDto } from './dto/flaming.dto';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { UpdateFlamingDto } from './dto/update-flaming.dto';

@Injectable()
export class FlamingService implements OnModuleInit, OnModuleDestroy {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'flaming',
        brokers: ['172.17.0.1:9092'],
      },
      consumer: {
        groupId: 'flaming-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;
  async onModuleInit() {
    const requestPatters = [
      'find-filter-flaming',
      'find-flaming',
      'create-flaming',
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

  create(createFlaming: FlamingDto): Observable<FlamingDto> {
    return this.client.send('create-flaming', createFlaming);
  }

  findByFilter(): Observable<FlamingDto[]> {
    return this.client.send('find-filter-flaming', {});
  }

  findOne(id: number): Observable<FlamingDto> {
    return this.client.send('find-flaming', { id });
  }

  update(payload: Partial<UpdateFlamingDto>) {
    return this.client.emit('update-flaming', payload);
  }

  remove(id: number) {
    return this.client.emit('delete-flaming', { id });
  }
}
