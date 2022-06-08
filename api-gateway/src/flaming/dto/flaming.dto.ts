import { IsArray, IsNotEmpty, IsNumberString } from 'class-validator';
import { ObjectID } from 'typeorm';

export class FlamingDto {
  id: ObjectID;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  coordinates: [number, number];

  @IsNotEmpty()
  val: number;

  @IsNotEmpty()
  files: string[];

  @IsNotEmpty()
  @IsNumberString()
  year: Date;
}
