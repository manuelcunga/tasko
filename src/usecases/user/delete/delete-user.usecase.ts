import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class DeleteUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async remove(id: string) {
    try {
      const user = await this.userRepository.findByID(id);
      if (!user) {
        throw new NotFoundException(messages.userNotFound);
      }
      return this.userRepository.remove({ id });
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}
