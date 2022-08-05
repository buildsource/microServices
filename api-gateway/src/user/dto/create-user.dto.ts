import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AttributeUserDto } from './attribute-user.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  enabled: boolean;

  @IsNotEmpty()
  @IsString()
  username: string;

  @ValidateNested()
  @Type(() => AttributeUserDto)
  attributes: AttributeUserDto;
}
