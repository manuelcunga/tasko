import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { PrismaUserRepository } from 'src/infra/database/repository/prisma-user-repository';

import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { IWalletRepository } from 'src/domain/repository/wallet/Iwallet-repository';
import { PrismaWalletRepository } from 'src/infra/database/repository/prisma-wallet-repository';
import { INotificationRepository } from 'src/domain/repository/notification/INotification-repository';
import { PrismaNotificationRepository } from 'src/infra/database/repository/prisma-notifications-repository';
import { ITransitionRepository } from 'src/domain/repository/transition/ITransition-repository';
import { PrismaTransactionRepository } from 'src/infra/database/repository/prisma-transaction-repository ';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { PrismaServiceRepository } from 'src/infra/database/repository/prisma-service-repository';
import { FindAllContractServiceUsecase } from './lidtAll/list-all.service-contract';
import { FindOneContractServiceUsecase } from './findOne/find-one-contract-service.usecase';
import { UpdateContractServiceUsecase } from './update/update-contractService.usecase';
import { DeleteContractServiceUsecase } from './delete/delete-contract-service.usecase';
import { CreateContractServiceController } from 'src/infra/api/rest/controllers/contract/create/create-contract-service-controller';
import { FindAllContractServiceController } from 'src/infra/api/rest/controllers/contract/findAll/findAll-contract-service-controller';
import { FindOneContractServiceController } from 'src/infra/api/rest/controllers/contract/findOne/findOne-service-controller';
import { DeleteContractServiceController } from 'src/infra/api/rest/controllers/contract/remove/remove-contract-service-service-controller';
import { CreateContractServiceUsecase } from './create/contract-service.usecase';
import { UpdateContractServiceController } from 'src/infra/api/rest/controllers/contract/update/update-contract-service-controller';
import { IContractRepository } from 'src/domain/repository/contracts/IContract-repository';
import { PrismaContractServiceRepository } from 'src/infra/database/repository/prisma-contract-repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: INotificationRepository,
      useClass: PrismaNotificationRepository,
    },
    {
      provide: ITransitionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: IContractRepository,
      useClass: PrismaContractServiceRepository,
    },
    {
      provide: IServiceRepository,
      useClass: PrismaServiceRepository,
    },

    {
      provide: IWalletRepository,
      useClass: PrismaWalletRepository,
    },

    CreateContractServiceUsecase,
    FindAllContractServiceUsecase,
    FindOneContractServiceUsecase,
    UpdateContractServiceUsecase,
    DeleteContractServiceUsecase,
  ],

  controllers: [
    CreateContractServiceController,
    FindAllContractServiceController,
    FindOneContractServiceController,

    UpdateContractServiceController,
    DeleteContractServiceController,
  ],
})
export class ContractModule {}
