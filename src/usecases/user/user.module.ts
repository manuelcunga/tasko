import { Module } from '@nestjs/common';
import { IAddressRepository } from 'src/domain/repository/address/IAddress-repository';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { PrismaAddressRepository } from 'src/infra/database/repository/prisma-address-repository';
import { PrismaUserRepository } from 'src/infra/database/repository/prisma-user-repository';
import { FindAllUserUsecase } from './lidtAll/list-all.usecase';
import { CreateUserUsecase } from './create/create-user.usecase';
import { UpdateUserUsecase } from './update/update-user.usecase';
import { DeleteUserUsecase } from './delete/delete-user.usecase';
import { ProfileUserUsecase } from './profile/user-profile.usecase';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { CreateUserController } from 'src/infra/api/rest/controllers/user/create/create-user-controller';
import { IWalletRepository } from 'src/domain/repository/wallet/Iwallet-repository';
import { PrismaWalletRepository } from 'src/infra/database/repository/prisma-wallet-repository';
import { FindOneUserController } from 'src/infra/api/rest/controllers/user/findOne/findOne-user-controller';
import { FindUserOneUsecase } from './findOne/find-one-user.usecase';
import { FindAllUserController } from 'src/infra/api/rest/controllers/user/findAll/findAll-user-controller';
import { UpdateUserController } from 'src/infra/api/rest/controllers/user/update/update-user-controller';
import { DeleteUserUserController } from 'src/infra/api/rest/controllers/user/remove/remove-user-controller';
import { ProfileUserController } from 'src/infra/api/rest/controllers/user/profile/profile-user-controller';
import { CreateProviderUserController } from 'src/infra/api/rest/controllers/user/create-provider/create-provider-user-controller';
import { CreateuserProviderUsecase } from './create-provider/create-provider-usecase';

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

    {
      provide: IWalletRepository,
      useClass: PrismaWalletRepository,
    },

    FindAllUserUsecase,
    CreateUserUsecase,
    FindUserOneUsecase,
    UpdateUserUsecase,
    DeleteUserUsecase,
    ProfileUserUsecase,
    CreateuserProviderUsecase,
  ],

  controllers: [
    CreateUserController,
    FindOneUserController,
    FindAllUserController,
    UpdateUserController,
    DeleteUserUserController,
    ProfileUserController,
    CreateProviderUserController,
  ],
})
export class UserModule {}
