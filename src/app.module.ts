import { Module } from '@nestjs/common';

import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './usecases/auth/auth.module';
import { UserModule } from './usecases/user/user.module';
import { AddressModule } from './usecases/address/address.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),

    UserModule,
    AuthModule,
    AddressModule,
  ],
  controllers: [],
})
export class AppModule {}
