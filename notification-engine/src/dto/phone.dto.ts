import { IsNotEmpty, IsMobilePhone, IsString } from 'class-validator';

export class PhoneDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsMobilePhone()
  phone: string;
}
