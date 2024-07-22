import { BadRequestException } from '@nestjs/common';
import { Service } from '@prisma/client';

export class ServiceEntity implements Service {
  id: string;
  title: string;
  description: string;
  date: Date;
  price: number;
  addressID: string;
  providerID: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(
    id: string,
    title: string,
    description: string,
    date: Date,
    price: number,
    addressID: string,
    providerID: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.price = price;
    this.addressID = addressID;
    this.providerID = providerID;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.deletedAt === null;
  }

  markAsDeleted(): void {
    if (this.deletedAt !== null) {
      throw new BadRequestException('Service is already deleted.');
    }
    this.deletedAt = new Date();
  }

  updateDescription(newDescription: string): void {
    if (!this.isActive()) {
      throw new BadRequestException(
        'Cannot update description of a deleted service.',
      );
    }
    this.description = newDescription;
  }

  updatePrice(newPrice: number): void {
    if (!this.isActive()) {
      throw new BadRequestException(
        'Cannot update price of a deleted service.',
      );
    }
    if (newPrice <= 0) {
      throw new BadRequestException('Price must be positive.');
    }
    this.price = newPrice;
  }

  isScheduledFor(date: Date): boolean {
    return this.date.toDateString() === date.toDateString();
  }

  daysUntilService(): number {
    const now = new Date();
    const diffTime = Math.abs(this.date.getTime() - now.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
