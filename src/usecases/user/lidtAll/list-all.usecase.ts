import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class FindAllUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async findAll() {
    try {
      return this.userRepository.findAll();
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}
