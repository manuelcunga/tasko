import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { IAddressRepository } from 'src/domain/repository/address/IAddress-repository';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { PrismaAddressRepository } from 'src/infra/database/repository/prisma-address-repository';
import { PrismaUserRepository } from 'src/infra/database/repository/prisma-user-repository';
import { FindAllUserUsecase } from './lidtAll/list-all.usecase';
import { CreateUserUsecase } from './create/create-user.usecase';
import { FindOneUsecase } from './findOne/find-one-user.usecase';
import { UpdateUserUsecase } from './update/update-user.usecase';
import { DeleteUserUsecase } from './delete/delete-user.usecase';
import { ProfileUserUsecase } from './profile/user-profile.usecase';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: IAddressRepository,
      useClass: PrismaAddressRepository,
    },

    FindAllUserUsecase,
    CreateUserUsecase,
    FindOneUsecase,
    UpdateUserUsecase,
    DeleteUserUsecase,
    ProfileUserUsecase,
  ],
})
export class UserModule {}
