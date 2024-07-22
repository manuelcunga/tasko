import { Transaction } from '@prisma/client';
import { TransactionType } from 'src/shared/utils/enums';
import { BadRequestException } from '@nestjs/common';
import { messages } from 'src/shared/utils/errors-messages';

export class TransactionEntity implements Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: Date;
  description: string;
  userID: string;
  walletID: string;
  serviceID: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(
    id: string,
    amount: number,
    type: TransactionType,
    date: Date,
    description: string,
    userID: string,
    walletID: string,
    serviceID: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.date = date;
    this.description = description;
    this.userID = userID;
    this.walletID = walletID;
    this.serviceID = serviceID;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.deletedAt === null;
  }

  markAsDeleted(): void {
    if (this.deletedAt !== null) {
      throw new BadRequestException(messages.InvalidTransactionOperation);
    }
    this.deletedAt = new Date();
  }

  updateDescription(newDescription: string): void {
    if (!this.isActive()) {
      throw new BadRequestException(messages.InvalidTransactionUpdate);
    }
    this.description = newDescription;
  }

  updateAmount(newAmount: number): void {
    if (!this.isActive()) {
      throw new BadRequestException(
        'Cannot update amount of a deleted transaction.',
      );
    }
    if (newAmount <= 0) {
      throw new BadRequestException('Amount must be positive.');
    }
    this.amount = newAmount;
  }

  isType(type: TransactionType): boolean {
    return this.type === type;
  }

  daysSinceTransaction(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
