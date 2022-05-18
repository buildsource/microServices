import { IsNotEmpty, IsString } from 'class-validator';

export class Auth {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
