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
import { BookDto } from './dto/book.dto';
import { BookService } from './book.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookAssessmentsDto } from './dto/bookAssessments.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() user: BookDto) {
    return this.bookService.create(user);
  }
  @UseGuards(JwtAuthGuard)
  @Post('assessments')
  createAssessments(@Body() assessments: BookAssessmentsDto) {
    return this.bookService.createAssessments(assessments);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Observable<BookDto[]> {
    return this.bookService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<BookDto> {
    return this.bookService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() { name, abstract, author, year }: Partial<UpdateBookDto>,
  ) {
    return this.bookService.update({
      id,
      name,
      abstract,
      author,
      year,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
