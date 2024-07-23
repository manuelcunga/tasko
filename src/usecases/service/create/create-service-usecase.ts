import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { ServiceOutPut } from '../dtos/service-output';
import { CreateServiceInput } from '../dtos/create-service.input';
import { messages } from 'src/shared/utils/errors-messages';
import { IAddressRepository } from 'src/domain/repository/address/IAddress-repository';
import { IsDateInThePast } from 'src/shared/utils/utils';

@Injectable()
export class CreateServiceUsecase {
  constructor(
    private serviceRepo: IServiceRepository,
    private addressRepo: IAddressRepository,
  ) {}

  async execute(data: CreateServiceInput): Promise<ServiceOutPut> {
    if (IsDateInThePast(data.date)) {
      throw new BadRequestException(
        'A data de criação do serviço não pode estar no passado.',
      );
    }

    const user = await this.serviceRepo.findByID(data.providerID);

    if (user) {
      throw new NotFoundException(messages.userNotFound);
    }

    const address = await this.addressRepo.findById(data.addressID);

    if (!address) {
      throw new NotFoundException(messages.addressNotfound);
    }

    const newService = await this.serviceRepo.create(data);
    return newService;
  }
}
