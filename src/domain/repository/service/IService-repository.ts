import { CreateServiceInput } from 'src/usecases/service/dtos/create-service.input';
import { UpdateServiceInput } from 'src/usecases/service/dtos/update-service.input ';
import { ServiceOutPut } from 'src/usecases/service/dtos/service-output';

export abstract class IServiceRepository {
  abstract create(data: CreateServiceInput): Promise<ServiceOutPut>;
  abstract findAll(): Promise<ServiceOutPut[]>;
  abstract findByID(id: string): Promise<ServiceOutPut>;
  abstract remove(id: string): Promise<void>;
  abstract update(id: string, data: UpdateServiceInput): Promise<ServiceOutPut>;
}
