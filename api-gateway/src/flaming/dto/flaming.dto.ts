import { IsArray, IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm';
import { EthnicityEnum } from '../enum/ethnicity.enum';
import { EyeColorEnum } from '../enum/eyeColor.enum';
import { HairSizeEnum } from '../enum/hairSize.enum';
import { GenreEnum } from '../enum/genre.enum';
import { HairstyleEnum } from '../enum/hairstyle.enum';
import { LanguagesEnum } from '../enum/languages.enum';
import { LocalEnum } from '../enum/local.enum';
import { PaymentsEnum } from '../enum/payments.enum';
import { SexualOrientationEnum } from '../enum/sexualOrientation.enum';
import { ISchedules } from '../interfaces/schedules.interface';

export class FlamingDto {
  _id: ObjectID;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  document: string;

  documentVerified: boolean;

  @IsNotEmpty()
  year: Date;

  description: string;

  local: LocalEnum[];

  @IsNotEmpty()
  @IsArray()
  coordinates: [number, number];

  @IsNotEmpty()
  @IsArray()
  schedules: ISchedules[];

  amounts: [number | undefined];

  @IsNotEmpty()
  genre: GenreEnum;

  @IsNotEmpty()
  sex: string;

  smoker: boolean;

  weight: number;

  height: number;

  ethnicity: [EthnicityEnum];

  eyeColor: [EyeColorEnum];

  hairstyle: [HairstyleEnum];

  languages: LanguagesEnum;

  hairSize: HairSizeEnum;

  footSize: number;

  silicone: boolean;

  tattoos: boolean;

  piercings: boolean;

  sign: string;

  sexualOrientation: SexualOrientationEnum;

  payments: [PaymentsEnum];

  files: string[];
}
