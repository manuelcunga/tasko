import { TransactionType } from '@prisma/client';

export class TransitionOutPut {
  id: string;
  amount: number;
  type: TransactionType;
  userID: string;
  walletID: string;
  serviceID: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
