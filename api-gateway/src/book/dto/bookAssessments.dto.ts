import { IsEmpty, IsNotEmpty } from 'class-validator';
import { BookDto } from './book.dto';

export class BookAssessmentsDto {
  id: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  book: BookDto;

  @IsNotEmpty()
  start: string;

  @IsEmpty()
  comment: string;
}
