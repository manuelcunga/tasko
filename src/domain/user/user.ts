import { User, UserRole } from '@prisma/client';
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

  updateUser(fields: Partial<UserEntity>): void {
    if (this.deletedAt !== null) {
      throw new Error('Cannot update a deleted user.');
    }

    if (fields.name !== undefined && fields.name.trim() !== '') {
      this.name = fields.name;
    }
    if (fields.email !== undefined && fields.email.trim() !== '') {
      this.email = fields.email;
      if (!this.validateEmail()) {
        throw new Error('Invalid email format');
      }
    }
    if (fields.nif !== undefined && fields.nif.trim() !== '') {
      this.nif = fields.nif;
    }
    if (fields.phone !== undefined && fields.phone.trim() !== '') {
      this.phone = fields.phone;
    }
    if (fields.addressID !== undefined && fields.addressID.trim() !== '') {
      this.addressID = fields.addressID;
    }
    if (fields.password !== undefined && fields.password.trim() !== '') {
      this.password = fields.password;
    }

    this.updatedAt = new Date();
  }
}
