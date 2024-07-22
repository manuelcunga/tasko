import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class FindOneUsecase {
  constructor(private userRepository: IUserRepository) {}

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findByID(id);

      if (!user) {
        throw new NotFoundException(messages.userNotFound);
      }
      return this.userRepository.findByID(id);
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}
