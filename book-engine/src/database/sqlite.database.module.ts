import { BookEntity } from '../entities/book.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [BookEntity],
      synchronize: true,
    }),
  ],
})
export class SqliteDatabaseModule {}
