import { UserRole } from 'src/shared/utils/enums';

export class UserOutput {
  id: string;

  name: string;

  nif: string;

  email: string;

  phone: string;

  addressID: string;

  role: UserRole;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
