import { Module } from '@nestjs/common';

import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './usecases/auth/auth.module';
import { UserModule } from './usecases/user/user.module';
import { AddressModule } from './usecases/address/address.module';
import { ServiceModule } from './usecases/service/service.module';
import { TransactionModule } from './usecases/transition/transition.module';
import { NotificationModule } from './usecases/notifications/notification.module';
import { ContractModule } from './usecases/contract/contract.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),

    UserModule,
    AuthModule,
    AddressModule,
    ServiceModule,
    TransactionModule,
    NotificationModule,
    ContractModule,
  ],
  controllers: [],
})
export class AppModule {}
