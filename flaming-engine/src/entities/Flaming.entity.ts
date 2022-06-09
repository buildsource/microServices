import { EthnicityEnum } from 'src/enum/ethnicity.enum';
import { EyeColorEnum } from 'src/enum/eyeColor.enum';
import { GenreEnum } from 'src/enum/genre.enum';
import { HairSizeEnum } from 'src/enum/hairSize.enum';
import { HairstyleEnum } from 'src/enum/hairstyle.enum';
import { LanguagesEnum } from 'src/enum/languages.enum';
import { LocalEnum } from 'src/enum/local.enum';
import { PaymentsEnum } from 'src/enum/payments.enum';
import { SexualOrientationEnum } from 'src/enum/sexualOrientation.enum';
import { ISchedules } from 'src/interfaces/schedules.interface';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FlamingEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  documentVerified: boolean;

  @Column()
  description: string;

  @Column()
  coordinates: [number, number];

  @Column()
  local: LocalEnum[];

  @Column()
  schedules: ISchedules[];

  @Column()
  amounts: [number | undefined];

  @Column()
  genre: GenreEnum;

  @Column()
  sex: string;

  @Column()
  smoker: boolean;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column({ default: EthnicityEnum.Undefined })
  ethnicity: [EthnicityEnum];

  @Column({ default: EyeColorEnum.Undefined })
  eyeColor: [EyeColorEnum];

  @Column({ default: HairstyleEnum.Undefined })
  hairstyle: [HairstyleEnum];

  @Column({ default: LanguagesEnum.ptBr })
  languages: LanguagesEnum;

  @Column({ default: HairSizeEnum.Undefined })
  hairSize: HairSizeEnum;

  @Column()
  footSize: number;

  @Column()
  silicone: boolean;

  @Column()
  tattoos: boolean;

  @Column()
  piercings: boolean;

  @Column()
  sign: string;

  @Column({ default: SexualOrientationEnum.Undefined })
  sexualOrientation: SexualOrientationEnum;

  @Column({ default: PaymentsEnum.Undefined })
  payments: [PaymentsEnum];

  @Column()
  files: string[];

  @Column()
  year: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
