import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/shared/utils/errors-messages';
import { UpdateServiceInput } from '../dtos/update-service.input ';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';

@Injectable()
export class UpdateServiceUsecase {
  constructor(private servieRepo: IServiceRepository) {}

  async execute(updateService: UpdateServiceInput) {
    const service = await this.servieRepo.findByID(updateService.serviceID);
    if (!service) {
      throw new NotFoundException(messages.serviceNotFound);
    }

    if (
      updateService.title !== undefined &&
      updateService.title.trim() !== ''
    ) {
      service.title = updateService.title;
    }
    if (
      updateService.description !== undefined &&
      service.description.trim() !== ''
    ) {
      service.description = updateService.description;
    }
    if (updateService.date instanceof Date) {
      service.date = updateService.date;
    }

    if (updateService.price !== undefined && updateService.price > 0) {
      service.price = updateService.price;
    }

    const Newservice = await this.servieRepo.update(service.id, updateService);
    return Newservice;
  }
}
