import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
