import { BookEntity } from '../entities/book.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookAssessmentsEntity } from 'src/entities/bookAssessments.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'docker',
      database: 'user',
      entities: [BookEntity, BookAssessmentsEntity],
      synchronize: true,
    }),
  ],
})
export class PostgresDatabaseModule {}
