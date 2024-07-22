import { Role } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nif: string;

  @IsString()
  phone: string;

  @IsString()
  addressID: string;

  role: Role;
}
