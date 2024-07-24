import { TransactionType } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateTransacttionInput {
  amount: number;

  type: TransactionType;

  userID: string;

  @IsString()
  walletID: string;

  @IsString()
  serviceID: string;
}