import { UserRole } from '@prisma/client';

export class UserOutput {
  id: string;

  name: string;

  nif: string;

  email: string;

  phone: string;

  password?: string;

  addressID: string;

  role: UserRole;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
