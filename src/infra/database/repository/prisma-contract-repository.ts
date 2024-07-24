import { PrismaService } from '../prisma/prisma.service';
import { IContractRepository } from '../../../domain/repository/contracts/IContract-repository';
import { CreateContractServiceInput } from '../../../usecases/contract/dtos/contract-service--input';
import { ContractOutPut } from '../../../usecases/contract/dtos/contact-output';
import { UpdateContractInput } from '../../../usecases/contract/dtos/update-contract-input';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaContractServiceRepository implements IContractRepository {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateContractServiceInput): Promise<ContractOutPut> {
    const contract = await this.prisma.contract.create({
      data: {
        clientId: input.clientId,
        serviceId: input.serviceId,
        status: input.status,
      },
    });
    return contract;
  }

  async findAll(): Promise<ContractOutPut[]> {
    const contract = await this.prisma.contract.findMany();
    return contract;
  }

  async findById(id: string): Promise<ContractOutPut> {
    const contract = await this.prisma.contract.findFirst({
      where: { id },
    });
    return contract;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.contract.delete({
      where: { id },
    });
  }
  async update(id: string, data: UpdateContractInput): Promise<ContractOutPut> {
    const contract = await this.prisma.contract.update({
      where: { id },
      data,
    });

    return contract;
  }
}
