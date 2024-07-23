import { BadRequestException } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export class WalletEntity implements Wallet {
  id: string;
  balance: number;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(balance: number, userID: string, id?: string) {
    this.id = id ?? uuidv4();
    this.balance = balance;
    this.userID = userID;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.deletedAt === null;
  }

  markAsDeleted(): void {
    if (this.deletedAt !== null) {
      throw new BadRequestException('Wallet is already deleted.');
    }
    this.deletedAt = new Date();
  }

  deposit(amount: number): void {
    if (!this.isActive()) {
      throw new BadRequestException('Cannot deposit to a deleted wallet.');
    }
    if (amount <= 0) {
      throw new BadRequestException('Deposit amount must be positive.');
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (!this.isActive()) {
      throw new BadRequestException('Cannot withdraw from a deleted wallet.');
    }
    if (amount <= 0) {
      throw new BadRequestException('Withdrawal amount must be positive.');
    }
    if (amount > this.balance) {
      throw new BadRequestException('Insufficient balance for withdrawal.');
    }
    this.balance -= amount;
  }

  hasSufficientBalance(amount: number): boolean {
    return this.balance >= amount;
  }
}
