import { CreateUserInput } from 'src/usecases/user/dtos/create-user-input';
import { ProfileOutput } from 'src/usecases/user/dtos/profile-output';
import { UpdateUserInput } from 'src/usecases/user/dtos/update-user-input';
import { UserOutput } from 'src/usecases/user/dtos/user-output';

export abstract class IUserRepository {
  abstract create(data: CreateUserInput): Promise<UserOutput>;
  abstract findAll(): Promise<UserOutput[]>;
  abstract findByID(id: string): Promise<UserOutput>;
  abstract findByEmail(email: string): Promise<UserOutput | null>;
  abstract remove({ id }: { id: string }): Promise<void>;
  abstract update(id: string, user: UpdateUserInput): Promise<UserOutput>;
  abstract profile(userId: string): Promise<ProfileOutput>;
}
