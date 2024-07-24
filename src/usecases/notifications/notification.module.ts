import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { INotificationRepository } from 'src/domain/repository/notification/INotification-repository';
import { PrismaNotificationRepository } from 'src/infra/database/repository/prisma-notifications-repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: INotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],

  controllers: [],
})
export class NotificationModule {}
