import { Injectable } from '@nestjs/common';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { ServiceOutPut } from '../dtos/service-output';

@Injectable()
export class ListAllServicesUsecase {
  constructor(private serviceRepo: IServiceRepository) {}

  async execute(): Promise<ServiceOutPut[]> {
    const services = await this.serviceRepo.findAll();
    return services;
  }
}
