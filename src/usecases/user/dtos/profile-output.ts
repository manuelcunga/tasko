import { UserRole } from '@prisma/client';
import { AddressEntity } from 'src/domain/address/address';

export class ProfileOutput {
  name: string;

  email: string;

  phone: string;

  role: UserRole;

  addressID: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  address: AddressEntity;
}
