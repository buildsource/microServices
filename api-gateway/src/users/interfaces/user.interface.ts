import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
