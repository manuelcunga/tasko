import { AddressEntity } from 'src/domain/address/address';
import { CreateAddressInput } from 'src/usecases/address/dtos/create-address.input';
import { UpdateAddressInput } from 'src/usecases/address/dtos/update-address.input';

export abstract class IAddressRepository {
  abstract create(data: CreateAddressInput): Promise<AddressEntity>;
  abstract findAll(): Promise<AddressEntity[]>;
  abstract findById(id: string): Promise<AddressEntity>;
  abstract remove({ id }: { id: string }): Promise<void>;
  abstract update(data: UpdateAddressInput): Promise<AddressEntity>;
}
