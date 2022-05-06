import { BookAssessmentsEntity } from './../entities/bookAssessments.entity';
import { BookEntity } from '../entities/book.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [BookEntity, BookAssessmentsEntity],
      synchronize: true,
    }),
  ],
})
export class SqliteDatabaseModule {}
