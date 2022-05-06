import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Book } from './interfaces/book.interface';
import { BookService } from './book.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookAssessments } from './interfaces/bookAssessments.interface';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() user: Book) {
    return this.bookService.create(user);
  }
  @UseGuards(JwtAuthGuard)
  @Post('assessments')
  createAssessments(@Body() assessments: BookAssessments) {
    return this.bookService.createAssessments(assessments);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Observable<Book[]> {
    return this.bookService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<Book> {
    return this.bookService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() { name, abstract, author, year }: Book,
  ) {
    const payload: Book = {
      id,
      name,
      abstract,
      author,
      year,
    };

    return this.bookService.update(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
