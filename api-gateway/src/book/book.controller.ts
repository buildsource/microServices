import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Book } from './interfaces/book.interface';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  create(@Body() user: Book) {
    return this.bookService.create(user);
  }

  @Get()
  findAll(): Observable<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Book> {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() { name, abstract, author }: Book,
  ) {
    const payload: Book = {
      id,
      name,
      abstract,
      author,
    };

    return this.bookService.update(payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
