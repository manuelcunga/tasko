import { Role } from '@prisma/client';
import { AddressEntity } from 'src/domain/address/address';

export class ProfileOutput {
  name: string;

  email: string;

  password: string;

  phone: string;

  role: Role;

  addressID: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  address: AddressEntity;
}
