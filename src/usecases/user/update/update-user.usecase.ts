import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from '../dtos/update-user-input';
import { messages } from 'src/shared/utils/errors-messages';
import { IAddressRepository } from 'src/domain/repository/address/IAddress-repository';
import { CreateAddressInput } from 'src/usecases/address/dtos/create-address.input';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    private userRepository: IUserRepository,
    private iaddresRepository: IAddressRepository,
  ) {}

  async update(
    updateUserDTO: UpdateUserInput,
    addressInput: CreateAddressInput,
  ) {
    try {
      const checkAddress = await this.iaddresRepository.findById(
        updateUserDTO.addressID,
      );

      if (!checkAddress) {
        throw new NotFoundException(messages.addressNotfound);
      }

      const checkUser = await this.userRepository.findByID(updateUserDTO.id);

      if (!checkUser) {
        throw new NotFoundException(messages.userNotFound);
      }

      const address = await this.iaddresRepository.create(addressInput);

      updateUserDTO.addressID = address.id;
      const user = await this.userRepository.update(
        updateUserDTO.id,
        updateUserDTO,
      );
      return user;
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}
