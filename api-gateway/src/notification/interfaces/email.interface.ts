import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class Email {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
