import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { CreateServiceInput } from 'src/usecases/service/dtos/create-service.input';
import { ServiceOutPut } from 'src/usecases/service/dtos/service-output';
import { UpdateServiceInput } from 'src/usecases/service/dtos/update-service.input ';

@Injectable()
export class PrismaServiceRepository implements IServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateServiceInput): Promise<ServiceOutPut> {
    const service = await this.prisma.service.create({
      data,
    });
    return service;
  }

  async findAll(): Promise<ServiceOutPut[]> {
    const services = await this.prisma.service.findMany();

    return services;
  }

  async findByID(id: string): Promise<ServiceOutPut> {
    const service = await this.prisma.service.findFirst({
      where: { id },
    });
    return service;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.service.delete({
      where: { id },
    });
  }

  async update(
    serviceID: string,
    input: UpdateServiceInput,
  ): Promise<ServiceOutPut> {
    const service = await this.prisma.service.update({
      where: { id: serviceID },
      data: input,
    });

    return service;
  }
}
