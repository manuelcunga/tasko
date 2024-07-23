import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from '../dtos/update-user-input';
import { messages } from 'src/shared/utils/errors-messages';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';

@Injectable()
export class UpdateUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(updateUserDTO: UpdateUserInput) {
    const checkUser = await this.userRepository.findByID(updateUserDTO.id);

    if (!checkUser) {
      throw new NotFoundException(messages.userNotFound);
    }

    if (updateUserDTO.name !== undefined && updateUserDTO.name.trim() !== '') {
      checkUser.name = updateUserDTO.name;
    }
    if (
      updateUserDTO.email !== undefined &&
      updateUserDTO.email.trim() !== ''
    ) {
      checkUser.email = updateUserDTO.email;
    }
    if (updateUserDTO.nif !== undefined && updateUserDTO.nif.trim() !== '') {
      checkUser.nif = updateUserDTO.nif;
    }
    if (
      updateUserDTO.phone !== undefined &&
      updateUserDTO.phone.trim() !== ''
    ) {
      checkUser.phone = updateUserDTO.phone;
    }
    if (
      updateUserDTO.addressID !== undefined &&
      updateUserDTO.addressID.trim() !== ''
    ) {
      checkUser.addressID = updateUserDTO.addressID;
    }
    if (
      updateUserDTO.password !== undefined &&
      updateUserDTO.password.trim() !== ''
    ) {
      checkUser.password = updateUserDTO.password;
    }

    const user = await this.userRepository.update(checkUser.id, updateUserDTO);
    return user;
  }
}
