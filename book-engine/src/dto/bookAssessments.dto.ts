import { StarEnum } from '../enum/start.enum';
import { IsEmpty, IsEnum, IsNotEmpty } from 'class-validator';

export class BookAssessmentsDto {
  id: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(StarEnum)
  start: StarEnum;

  @IsEmpty()
  comment: string;

  @IsNotEmpty()
  book: number;
}
