import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { PrismaServiceRepository } from 'src/infra/database/repository/prisma-service-repository';
import { CreateServiceUsecase } from './create/create-service-usecase';
import { IAddressRepository } from 'src/domain/repository/address/IAddress-repository';
import { PrismaAddressRepository } from 'src/infra/database/repository/prisma-address-repository';
import { CreateServiceController } from 'src/infra/api/rest/controllers/service/create/create-service-controller';
import { UpdateServiceUsecase } from './update/update-service.usecase';
import { FindOneServicesecase } from './findOne/find-one-services.usecase';
import { DeleteServiceUsecase } from './delete/delete-service.usecase';
import { FindAllServiceController } from 'src/infra/api/rest/controllers/service/findAll/findAll-service-controller';
import { ListAllServicesUsecase } from './lidtAll/list-all-services.usecase';
import { FindOneServiceController } from 'src/infra/api/rest/controllers/service/findOne/findOne-service-controller';
import { UpdateServiceController } from 'src/infra/api/rest/controllers/service/update/update-service-controller';
import { DeleteServiceController } from 'src/infra/api/rest/controllers/service/remove/remove-service-controller';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IServiceRepository,
      useClass: PrismaServiceRepository,
    },

    {
      provide: IAddressRepository,
      useClass: PrismaAddressRepository,
    },
    CreateServiceUsecase,
    UpdateServiceUsecase,
    FindOneServicesecase,
    DeleteServiceUsecase,
    ListAllServicesUsecase,
  ],

  controllers: [
    CreateServiceController,
    FindAllServiceController,
    FindOneServiceController,
    UpdateServiceController,
    DeleteServiceController,
  ],
})
export class ServiceModule {}
