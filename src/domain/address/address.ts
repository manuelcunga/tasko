import { Address } from '@prisma/client';

export class AddressEntity implements Address {
  id: string;

  country: string;

  province: string;

  city: string;

  district: string;

  street: string;

  number: string;

  fullAddress: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
