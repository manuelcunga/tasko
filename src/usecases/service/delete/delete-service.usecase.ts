import { Injectable, NotFoundException } from '@nestjs/common';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class DeleteServiceUsecase {
  constructor(private readonly serviceRepo: IServiceRepository) {}

  async execute(serviceID: string) {
    try {
      const service = await this.serviceRepo.findByID(serviceID);
      if (!service) {
        throw new NotFoundException(messages.serviceNotFound);
      }
      return this.serviceRepo.remove(serviceID);
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}
