import { IAddressRepository } from 'src/domain/repository/address/IAddress-repository';
import { CreateAddressInput } from '../dtos/create-address.input';
import { AddressEntity } from 'src/domain/address/address';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAddressUsecase {
  constructor(private addressRepo: IAddressRepository) {}

  async execute(data: CreateAddressInput): Promise<AddressEntity> {
    const address = await this.addressRepo.create(data);
    return address;
  }
}
