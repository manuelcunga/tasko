import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/shared/utils/errors-messages';
import { UserEntity } from 'src/domain/user/user';
import { UserOutput } from '../dtos/user-output';
import { CreateUserInput } from '../dtos/create-user-input';
import { EmailValidator, generateHash } from 'src/shared/utils/utils';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { UserRole } from 'src/shared/utils/enums';

@Injectable()
export class CreateUserUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(data: CreateUserInput): Promise<UserOutput> {
    if (!EmailValidator(data.email)) {
      throw new BadRequestException(messages.invalidEmail);
    }

    const user = await this.userRepo.findByEmail(data.email);

    if (user) {
      throw new BadRequestException(messages.userAlreadyExists);
    }
    const userEntity = new UserEntity(
      data.name,
      data.email,
      data.nif,
      data.password,
      data.addressID,
      data.phone,
    );

    const newUser = await this.userRepo.create({
      name: userEntity.name,
      email: userEntity.email,
      nif: userEntity.nif,
      phone: userEntity.phone,
      password: await generateHash(userEntity.password),
      addressID: userEntity.addressID,
      role: UserRole.CLIENT,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      nif: newUser.nif,
      addressID: newUser.addressID,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      deletedAt: newUser.deletedAt,
    };
  }
}
