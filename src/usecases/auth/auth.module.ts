import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { JwtStrategy } from './jwt-strategy/jwt.strategy.service';
import { LoginService } from './login/login.service';
import { PrismaUserRepository } from 'src/infra/database/repository/prisma-user-repository';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { LoginUserController } from 'src/infra/api/rest/controllers/user/login/login-user-controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    LoginService,
    JwtStrategy,
  ],

  controllers: [LoginUserController],
})
export class AuthModule {}
