import { Notification } from '@prisma/client';

export class Notifications implements Notification {
  id: string;
  userID: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
