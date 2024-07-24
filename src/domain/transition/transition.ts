import { Transaction } from '@prisma/client';
import { TransactionType } from 'src/shared/utils/enums';
import { BadRequestException } from '@nestjs/common';
import { messages } from 'src/shared/utils/errors-messages';

export class TransactionEntity implements Transaction {
  id: string;
  amount: number;
  type: TransactionType;
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
    userID: string,
    walletID: string,
    serviceID: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.type = type;
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
}
