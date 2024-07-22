import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { messages } from 'src/shared/utils/errors-messages';
import { ProfileOutput } from '../dtos/profile-output';

@Injectable()
export class ProfileUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async profile(userId: string): Promise<ProfileOutput> {
    const user = await this.userRepository.findByID(userId);
    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }
    const profile = await this.userRepository.profile(userId);
    return {
      ...profile,
      address: profile.address,
    };
  }
}
