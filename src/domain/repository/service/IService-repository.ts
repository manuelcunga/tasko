import { CreateUserInput } from 'src/usecases/user/dtos/create-user-input';
import { UpdateUserInput } from 'src/usecases/user/dtos/update-user-input';
import { UserOutput } from 'src/usecases/user/dtos/user-output';

export abstract class IServiceRepository {
  abstract create(data: CreateUserInput): Promise<UserOutput>;
  abstract findAll(): Promise<UserOutput[]>;
  abstract findByID(id: string): Promise<UserOutput>;
  abstract remove(id: string): Promise<void>;
  abstract update(id: string, user: UpdateUserInput): Promise<UserOutput>;
}
