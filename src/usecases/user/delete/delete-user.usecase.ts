import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class DeleteUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userID: string) {
    try {
      const user = await this.userRepository.findByID(userID);
      if (!user) {
        throw new NotFoundException(messages.userNotFound);
      }
      return this.userRepository.remove(userID);
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}
