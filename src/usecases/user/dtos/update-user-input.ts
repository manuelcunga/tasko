import { IsString } from 'class-validator';

export class UpdateUserInput {
  id: string;

  @IsString()
  name?: string;

  email?: string;

  phone?: string;

  addressID?: string;

  createdAt?: Date;

  updatedAt: Date;
}
