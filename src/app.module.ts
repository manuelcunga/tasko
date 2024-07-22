import { Module } from '@nestjs/common';

import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './usecases/auth/auth.module';
import { UserModule } from './usecases/user/user.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),

    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
