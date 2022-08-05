import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AttributeUserDto } from './attribute-user.dto';

export class UserDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsBoolean()
  enabled: boolean;

  @IsBoolean()
  emailVerified: boolean;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => AttributeUserDto)
  attributes: AttributeUserDto;
}
