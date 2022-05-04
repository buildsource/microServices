import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BookEntity)
    private repository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<BookEntity[]> {
    return await this.repository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async create(book: BookEntity): Promise<BookEntity> {
    return await this.repository.save(book);
  }

  async findOne(bookId: number): Promise<BookEntity> {
    if (!bookId) throw new Error();

    const response: BookEntity = await this.repository.findOneBy({
      id: bookId,
    });

    return response;
  }

  async update({
    id,
    name,
    abstract,
    author,
    year,
  }: BookEntity): Promise<void> {
    const book = await this.repository.findOneBy({ id });

    book.name = name ? name : book.name;
    book.abstract = abstract ? abstract : book.abstract;
    book.author = author ? author : book.author;
    book.year = year ? year : book.year;

    await this.repository.save(book);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
