import { PartialType } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class UpdateBookDto extends PartialType(BookDto) {}
