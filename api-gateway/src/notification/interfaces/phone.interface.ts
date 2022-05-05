import { IsNotEmpty, IsMobilePhone, IsString } from 'class-validator';

export class Phone {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsMobilePhone()
  phone: string;
}
