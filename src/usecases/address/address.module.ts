import { Module } from '@nestjs/common';
import { IAddressRepository } from 'src/domain/repository/address/IAddress-repository';

import { CreateAddressUsecase } from './create/create-address-usecase';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaAddressRepository } from 'src/infra/database/repository/prisma-address-repository';
import { CreateAddressController } from 'src/infra/api/rest/controllers/address/create/create-address-controller';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IAddressRepository,
      useClass: PrismaAddressRepository,
    },

    CreateAddressUsecase,
  ],

  controllers: [CreateAddressController],
})
export class AddressModule {}
