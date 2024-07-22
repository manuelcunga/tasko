import { User } from '@prisma/client';
import { UserRole } from 'src/shared/utils/enums';
import { v4 as uuidv4 } from 'uuid';

export class UserEntity implements User {
  id: string;
  name: string;
  nif: string;
  email: string;
  password: string;
  addressID: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(
    name: string,
    email: string,
    nif: string,
    password: string,
    addressID?: string,
    phone?: string,
    role?: UserRole,
    id?: string,
  ) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.email = email;
    this.nif = nif;
    this.phone = phone;
    this.password = password;
    this.addressID = addressID;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = undefined;
    this.id = id ?? uuidv4();

    this.validate();
    this.validateEmail();
  }

  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  validate(): void {
    if (!this.name || !this.email || !this.password) {
      throw new Error('Missing required fields');
    }
    if (!this.validateEmail()) {
      throw new Error('Invalid email format');
    }
  }
}
