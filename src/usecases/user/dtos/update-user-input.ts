import { IsOptional } from 'class-validator';

export class UpdateUserInput {
  id?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  nif?: string;

  @IsOptional()
  addressID?: string;
}
