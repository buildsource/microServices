import { BookAssessmentsEntity } from 'src/entities/bookAssessments.entity';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { BookDto } from './dto/book.dto';
import { BookAssessmentsDto } from './dto/bookAssessments.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(BookEntity)
    private repository: Repository<BookEntity>,
    @InjectRepository(BookAssessmentsEntity)
    private repositoryAssessmentsEntity: Repository<BookAssessmentsEntity>,
  ) {}

  async findAll(): Promise<BookDto[]> {
    const cache = await this.cacheManager.get<BookEntity[]>('books');

    if (cache) return cache;

    const response = await this.repository.find({
      order: {
        id: 'DESC',
      },
      relations: ['bookAssessments'],
    });

    return response;
  }

  async create(book: BookDto): Promise<BookDto> {
    await this.cacheManager.set('books', book);

    return await this.repository.save(book);
  }

  async createAssessments(
    bookAssessments: BookAssessmentsDto,
  ): Promise<BookAssessmentsDto> {
    return await this.repositoryAssessmentsEntity.save(bookAssessments);
  }

  async findOne(bookId: number): Promise<BookDto> {
    if (!bookId) throw new Error();

    const response: BookDto = await this.repository.findOneBy({
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
  }: Partial<UpdateBookDto>): Promise<void> {
    const book = await this.repository.findOneBy({ id });

    book.name = name ? name : book.name;
    book.abstract = abstract ? abstract : book.abstract;
    book.author = author ? author : book.author;
    book.year = year ? year : book.year;

    await this.cacheManager.set('books', book);

    await this.repository.update(id, book);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
