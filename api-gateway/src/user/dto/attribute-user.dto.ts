import { IsNotEmpty, IsString } from 'class-validator';

export class AttributeUserDto {
  @IsNotEmpty()
  @IsString()
  cpf: string | string[];

  @IsNotEmpty()
  @IsString()
  tenant: string | string[];
}
