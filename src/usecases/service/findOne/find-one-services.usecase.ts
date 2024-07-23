import { Injectable, NotFoundException } from '@nestjs/common';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class FindOneServicesecase {
  constructor(private serviceRepo: IServiceRepository) {}

  async execute(id: string) {
    const service = await this.serviceRepo.findByID(id);

    if (!service) {
      throw new NotFoundException(messages.serviceNotFound);
    }
    return this.serviceRepo.findByID(id);
  }
}
