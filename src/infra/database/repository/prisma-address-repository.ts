import { AddressEntity } from 'src/domain/address/address';
import { IAddressRepository } from 'src/domain/repository/address/IAddress-repository';
import { CreateAddressInput } from 'src/usecases/address/dtos/create-address.input';
import { UpdateAddressInput } from 'src/usecases/address/dtos/update-address.input';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAddressRepository implements IAddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAddressInput): Promise<AddressEntity> {
    const address = await this.prisma.address.create({
      data: data,
    });

    return address;
  }
  async findAll(): Promise<AddressEntity[]> {
    const address = await this.prisma.address.findMany();
    return address;
  }

  async findById(id: string): Promise<AddressEntity> {
    const address = await this.prisma.address.findFirst({
      where: { id: id },
    });
    return address;
  }
  async remove({ id }: { id: string }): Promise<void> {
    await this.prisma.address.delete({
      where: { id },
    });
  }
  async update(data: UpdateAddressInput): Promise<AddressEntity> {
    const address = await this.prisma.address.update({
      where: { id: data.id },
      data: data,
    });

    return address;
  }
}
