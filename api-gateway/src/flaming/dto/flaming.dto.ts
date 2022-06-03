import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FlamingDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  abstract: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  @IsNumberString()
  year: Date;
}
