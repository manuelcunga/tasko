import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Notifications } from 'src/domain/notifications/notification';
import { INotificationRepository } from 'src/domain/repository/notification/INotification-repository';
import { CreateNotificationInput } from 'src/usecases/notifications/dtos/create-notification.input';

@Injectable()
export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateNotificationInput): Promise<Notifications> {
    const notification = await this.prisma.notification.create({
      data: input,
    });

    return notification;
  }
  async findAll(): Promise<Notifications[]> {
    const notification = await this.prisma.notification.findMany();
    return notification;
  }
  async findByID(id: string): Promise<Notifications> {
    const notification = await this.prisma.notification.findFirst({
      where: { id },
    });
    return notification;
  }

  async remove(notificationID: string): Promise<void> {
    await this.prisma.notification.delete({
      where: { id: notificationID },
    });
  }
}
